import { connect } from '@/app/lib/data';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const client = await connect();
  const session = request.cookies.get('session');
  if (!session) {
    return NextResponse.json(
      { message: 'Already logged out' },
      { status: 200 },
    );
  }
  await client.query('DELETE FROM login_sessions WHERE id = $1', [
    session.value,
  ]);
  return NextResponse.json({ message: 'Logged out' }, { status: 200 });
}
