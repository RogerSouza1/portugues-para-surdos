import { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { supabase } from '../../lib/supabase'
import Auth from '../components/Auth'
import Account from '../components/Account'
import { Session } from '@supabase/supabase-js'
import Home from '../components/Home'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View style={styles.container}>
            {/* {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />} */}   
      <Home />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 20,
    color: '#FFF',
  },
})