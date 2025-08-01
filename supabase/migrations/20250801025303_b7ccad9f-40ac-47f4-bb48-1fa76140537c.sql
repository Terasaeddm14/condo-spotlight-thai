-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
        AND role = _role
    )
$$;

-- Create function to assign default user role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (new.id, 'user');
    RETURN new;
END;
$$;

-- Trigger to automatically assign user role on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
    ON public.user_roles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
    ON public.user_roles
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- Create projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    developer TEXT NOT NULL,
    image TEXT,
    description TEXT,
    total_units INTEGER NOT NULL DEFAULT 0,
    available_units INTEGER NOT NULL DEFAULT 0,
    price_min DECIMAL(15,2) NOT NULL,
    price_max DECIMAL(15,2) NOT NULL,
    completion_date DATE,
    facilities TEXT[],
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create units table
CREATE TABLE public.units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    unit_number TEXT NOT NULL,
    floor INTEGER NOT NULL,
    type TEXT NOT NULL,
    size DECIMAL(8,2) NOT NULL,
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    price_per_sqm DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold')),
    features TEXT[],
    view TEXT,
    balcony_size DECIMAL(8,2),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (project_id, unit_number)
);

-- Enable RLS on units
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;

-- RLS policies for projects (public read, admin write)
CREATE POLICY "Anyone can view projects"
    ON public.projects
    FOR SELECT
    TO authenticated, anon
    USING (true);

CREATE POLICY "Admins can manage projects"
    ON public.projects
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for units (public read, admin write)
CREATE POLICY "Anyone can view units"
    ON public.units
    FOR SELECT
    TO authenticated, anon
    USING (true);

CREATE POLICY "Admins can manage units"
    ON public.units
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_units_updated_at
    BEFORE UPDATE ON public.units
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();