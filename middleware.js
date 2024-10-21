import { NextResponse } from 'next/server'

function middleware(req) {
//   req.cookies.set('loggedIn');
  let verify = req.cookies.get('loggedIn');
  let url = req.url;

  if(!verify && url.includes('/dashboard')){
    return NextResponse.redirect(new URL('/auth/login', url));
  }

  if(verify && url === new URL('/auth/login', url)){
    return NextResponse.redirect(new URL('/dashboard', url));
  }
}

export default middleware