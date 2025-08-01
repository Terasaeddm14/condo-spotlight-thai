-- Drop dependent policies first
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can manage units" ON public.units;

-- Drop and recreate functions with proper search_path
DROP FUNCTION IF EXISTS public.has_role(_user_id UUID, _role app_role);
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Recreate has_role function with proper search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
        AND role = _role
    )
$$;

-- Recreate handle_new_user function with proper search_path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (new.id, 'user');
    RETURN new;
END;
$$;

-- Recreate the policies with the updated function
CREATE POLICY "Admins can manage all roles"
    ON public.user_roles
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage projects"
    ON public.projects
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage units"
    ON public.units
    FOR ALL
    TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));