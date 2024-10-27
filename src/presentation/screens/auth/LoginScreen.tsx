import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export const LoginScreen = () => {

  const { height } = useWindowDimensions();

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>

        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category='h1'>Ingresar</Text>
          <Text category='p2'>Por favor, ingrese para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder='Email'
            keyboardType='email-address'
            autoCapitalize='none'
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder='Password'
            autoCapitalize='none'
            secureTextEntry
            style={{ marginBottom: 10 }}
          />
        </Layout>

        <Layout style={{ height: 20 }} />

        <Layout>
          <Button
            onPress={() => { }}
          // appearance='ghost'
          >
            Enter
          </Button>
        </Layout>

        <Layout style={{ height: 50 }} />

        <Layout style={{
          alignItems: 'flex-end',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Text>Don't have an account?</Text>
          <Text
            status='primary'
            category='s1'
            onPress={() => { }}
          > create one</Text>
        </Layout>

      </ScrollView>
    </Layout>
  )
}
