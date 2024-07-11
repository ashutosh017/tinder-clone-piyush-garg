"use client"

import * as React from 'react'
import { Neo4JUser } from '@/types'
import TinderCard from 'react-tinder-card'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { neo4jSwipe } from '../neo4j.action'
import { redirect } from 'next/navigation'

interface HomepageClientComponentProps {
    currentUser: Neo4JUser,
    users: Neo4JUser[]
}

const HomepageClientComponent: React.FC<HomepageClientComponentProps> = ({ currentUser, users }) => {
    const handleSwipe = async (direction: string, userId: string) => {
        console.log(direction)
        const match = await neo4jSwipe(currentUser.applicationId, direction, userId);
        if (match) {
            alert("Congrats! It's a Match");
            redirect('/match')
        }
    }
    return <div className='h-screen w-screen flex items-center justify-center'>
        <div>

            <div>
                <h1 className='text-4xl'>
                    Hello {currentUser.firstname} {currentUser.lastname}
                </h1>
            </div>
            <div className='mt-4 relative'>
                {users.map((user) => <TinderCard className='absolute' onSwipe={(direction) => handleSwipe(direction, user.applicationId)} key={user.applicationId}>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {user.firstname}
                            </CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                        </CardHeader>
                    </Card>
                </TinderCard>)}
            </div>
        </div>

    </div>
}

export default HomepageClientComponent;