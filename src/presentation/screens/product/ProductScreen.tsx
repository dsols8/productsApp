import React, { useRef } from 'react'
import { FlatList, Image } from 'react-native'
import { MainLayout } from '../../layouts/MainLayout'
import { Button, ButtonGroup, Input, Layout, Text, useTheme } from '@ui-kitten/components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProductById } from '../../../actions/products/get-product-by-id'
import { RootStackParams } from '../../navigation/StackNavigator'
import { StackScreenProps } from '@react-navigation/stack'
import { ScrollView } from 'react-native-gesture-handler'
import { FadeInImage } from '../../components/ui/FadeInImage'
import { Gender, Product, Size } from '../../../domain/entities/product';
import { MyIcon } from '../../components/ui/MyIcon'
import { Formik } from 'formik'
import { updateCreateProduct } from '../../../actions/products/update-create-product'


const sizes: Size[] = [
  Size.Xs,
  Size.S,
  Size.M,
  Size.L,
  Size.Xl,
  Size.Xxl,
];

const genders: Gender[] = [
  Gender.Kid,
  Gender.Men,
  Gender.Women,
  Gender.Unisex,
]



interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { };


export const ProductScreen = ({ route }: Props) => {

  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
  const queryClient = useQueryClient();

  const { isLoading, data: product } = useQuery({
    queryKey: ['product', productIdRef.current],
    staleTime: 100 * 60, //1 hour
    queryFn: () => getProductById(productIdRef.current),
  });


  //Mutation

  const mutation = useMutation({
    mutationFn: (data: Product) => updateCreateProduct({ ...data, id: productIdRef.current }),
    onSuccess(data: Product) {
      productIdRef.current = data.id;

      queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
      queryClient.invalidateQueries({ queryKey: ['product', data.id] });
    },
    onError(error) {
      console.log(error)
    },
  })



  if (!product) {
    return (
      <MainLayout title='Cargando' />
    )
  }



  return (
    <Formik
      initialValues={product}
      onSubmit={mutation.mutate}
    >

      {
        ({ handleChange, handleSubmit, values, errors, setFieldValue }) => (

          <MainLayout
            title={values.title}
            subTitle={`Precio: ${values.price}`}
          >
            <ScrollView style={{ flex: 1 }}>

              {/* Imagenes del producto */}
              <Layout style={{marginVertical: 10, alignItems: 'center', justifyContent: 'center'}}>

                {
                  (values.images.length === 0)
                    ? <Image
                      source={require('../../../assets/no-product-image.png')}
                      style={{ width: 300, height: 300, marginHorizontal: 7 }}
                    />
                    : (

                      <FlatList
                        data={values.images}
                        keyExtractor={(item) => item}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                          <FadeInImage
                            uri={item}
                            style={{ width: 300, height: 300, marginHorizontal: 7 }}
                          />
                        )}
                      />

                    )
                }



              </Layout>


              {/* Forms */}
              <Layout style={{ marginHorizontal: 10 }}>
                <Input
                  label='Title'
                  style={{ marginVertical: 5 }}
                  value={values.title}
                  onChangeText={handleChange('title')}
                />
                <Input
                  label='Slug'
                  style={{ marginVertical: 5 }}
                  value={values.slug}
                  onChangeText={handleChange('slug')}
                />
                <Input
                  label='Description'
                  multiline
                  numberOfLines={5}
                  style={{ marginVertical: 5 }}
                  value={values.description}
                  onChangeText={handleChange('description')}
                />
              </Layout>

              <Layout style={{ marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', gap: 10 }}>
                <Input
                  label='Precio'
                  value={`${values.price}`}
                  onChangeText={handleChange('price')}
                  keyboardType='number-pad'
                  style={{ flex: 1 }}
                />
                <Input
                  label='Stock'
                  value={`${values.stock}`}
                  onChangeText={handleChange('stock')}
                  keyboardType='number-pad'
                  style={{ flex: 1 }}
                />
              </Layout>


              <ButtonGroup
                style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }}
                appearance='outline'
                size='small'
              >
                {
                  sizes.map((size) => (
                    <Button
                      onPress={() => setFieldValue(
                        'sizes',
                        values.sizes.includes(size)
                          ? values.sizes.filter(s => s !== size)
                          : [...values.sizes, size]
                      )}
                      key={size}
                      style={{
                        flex: 1,
                        backgroundColor: values.sizes.includes(size)
                          ? theme['color-primary-200']
                          : undefined,
                      }}
                    >
                      {size}
                    </Button>
                  ))
                }
              </ButtonGroup>

              <ButtonGroup
                style={{ margin: 2, marginTop: 30, marginHorizontal: 15 }}
                appearance='outline'
                size='small'
              >
                {
                  genders.map((gender) => (
                    <Button
                      onPress={() => setFieldValue('gender', gender)}
                      key={gender}
                      style={{
                        flex: 1,
                        backgroundColor: values.gender.startsWith(gender)
                          ? theme['color-primary-200']
                          : undefined,
                      }}
                    >
                      {gender}
                    </Button>
                  ))
                }
              </ButtonGroup>

              <Button
                onPress={() => handleSubmit()}
                disabled={mutation.isPending}
                style={{ margin: 15 }}
                accessoryLeft={<MyIcon name='save-outline' white />}
              >
                Guardar
              </Button>



              <Text>{JSON.stringify(values, null, 2)}</Text>





              <Layout style={{ height: 200 }} />

            </ScrollView>
          </MainLayout>

        )
      }



    </Formik>
  )
}
