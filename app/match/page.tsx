import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'
import { getMatches } from '../neo4j.action';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TinderCard from 'react-tinder-card';

export default async function MatchPage() {
    const { isAuthenticated, getUser } = getKindeServerSession();
    const user = await getUser();
    if (!(await isAuthenticated) || !user) {
        return redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/callback")
    }
    const matches = await getMatches(user.id)
    return (
        <main>
            {matches.map((user) =>
                <Card key={user.applicationId}>
                    <CardHeader>
                        <CardTitle>
                            {user.firstname} {user.lastname}
                        </CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                </Card>
            )}
        </main>
    )
}
