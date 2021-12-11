import Link from 'next/link';
import s from './Navbar.module.css';

import Logo from '@/components/icons/Logo';
import { useUser } from '@/utils/useUser';
import { supabase } from '@/utils/supabase-client'
import { useEffect } from 'react';

function Navbar({ user }) {
  //const { user, signOut } = useUser();

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-auto max-w-8xl px-8">
        <div className="flex justify-between align-center flex-row py-4 md:py-4 relative">
          <div className="flex flex-1 items-center">
            <Link href="/">
              <a className="text-xl font-extrabold mr-4 text-accents-0" aria-label="Logo">
                RotoSnap
              </a>
            </Link>
            <nav className="space-x-2 ml-6 hidden lg:block">
              {user ? <Link href="/dashboard">
                <a className={s.link}>Dashboard</a>
              </Link> : ''}
              <Link href="/pricing">
                <a className={s.link}>Pricing</a>
              </Link>
              {user ? <Link href="/account">
                <a className={s.link}>Account</a>
              </Link> : ''}
            </nav>
          </div>

          <div className="flex flex-1 justify-end space-x-8">
            {user ? (
              <div className="flex items-center space-x-8">
                <div className="font-medium">{user.email}</div>
                <Link href="#">
                  <a className={s.link} onClick={() => supabase.auth.signOut()}>
                    Sign out
                  </a>
                </Link>
              </div>
            ) : (
              <div className="flex">
                <Link href="/signin">
                  <a className={s.link}>Sign in</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav >
  );
};

export default Navbar;

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  // If there is a user, return it.
  return { props: { user } }
}
