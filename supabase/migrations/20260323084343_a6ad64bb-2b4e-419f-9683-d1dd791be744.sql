DROP POLICY IF EXISTS "Admins can delete articles" ON public.editorial_articles;
DROP POLICY IF EXISTS "Admins can insert articles" ON public.editorial_articles;
DROP POLICY IF EXISTS "Admins can update articles" ON public.editorial_articles;
DROP POLICY IF EXISTS "Anyone can read published articles" ON public.editorial_articles;
DROP TABLE IF EXISTS public.editorial_articles;