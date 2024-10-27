import { Button, Icon, Layout, Text } from '@ui-kitten/components'

export const HomeScreen = () => {
    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>HomeScreen</Text>

            <Button
            accessoryLeft={<Icon name='lock'/>}
            >
                unlock my pussy
            </Button>
        </Layout>
    )
}