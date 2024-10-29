import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MyIcon } from '../../components/ui/MyIcon'
import { RootStackParams } from '../../navigation/StackNavigator'
import { StackScreenProps } from '@react-navigation/stack'

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> { }



export const RegisterScreen = ({ navigation }: Props) => {

  const { height } = useWindowDimensions();

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 40 }}>

        <Layout style={{ paddingTop: height * 0.30 }}>
          <Text category='h1'>Register</Text>
          <Text category='p2'>Please, create an account to continue</Text>
        </Layout>



        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>

          <Input
            placeholder='Full Name'
            accessoryLeft={<MyIcon name='person-outline' />}
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder='Email'
            keyboardType='email-address'
            autoCapitalize='none'
            accessoryLeft={<MyIcon name='email-outline' />}
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder='Password'
            autoCapitalize='none'
            secureTextEntry
            accessoryLeft={<MyIcon name='lock-outline' />}
            style={{ marginBottom: 10 }}
          />

        </Layout>

        <Layout style={{ height: 20 }} />

        <Layout>
          <Button
            accessoryRight={<MyIcon name='arrow-forward-outline' white />}
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
          <Text>Already have an account?</Text>
          <Text
            status='primary'
            category='s1'
            onPress={() => navigation.goBack()}
          > Log In</Text>
        </Layout>

      </ScrollView>
    </Layout>
  )
}