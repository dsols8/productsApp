import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Alert, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MyIcon } from '../../components/ui/MyIcon'
import { RootStackParams } from '../../navigation/StackNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import { useAuthStore } from '../../store/auth/useAuthStore'

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> { }



export const RegisterScreen = ({ navigation }: Props) => {


  const { register } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
  })


  const { height } = useWindowDimensions();

  const onRegister = async () => {

    setIsPosting(true);

    const wasSuccesfull = await register(form.fullName, form.email, form.password);
    setIsPosting(false);
    if (wasSuccesfull) {
      Alert.alert('Register Successful!', 'Now login to enter...')
      navigation.goBack();
      return;
    } else {
      Alert.alert('Error', `Make sure the Full Name doesn't have numbers, the email is right, and password has letters and numbers`)
    }
  }


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
            value={form.fullName}
            onChangeText={(fullName) => setForm({ ...form, fullName })}
            accessoryLeft={<MyIcon name='person-outline' />}
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder='Email'
            keyboardType='email-address'
            autoCapitalize='none'
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            accessoryLeft={<MyIcon name='email-outline' />}
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder='Password'
            autoCapitalize='none'
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            secureTextEntry
            accessoryLeft={<MyIcon name='lock-outline' />}
            style={{ marginBottom: 10 }}
          />

        </Layout>

        <Layout style={{ height: 20 }} />

        <Layout>
          <Button
            disabled={isPosting}
            accessoryRight={<MyIcon name='arrow-forward-outline' white />}
            onPress={onRegister}
          >
            Register
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