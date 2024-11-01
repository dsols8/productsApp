import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { ProductList } from '../../components/products/ProductList';
import { FAB } from '../../components/ui/FAB';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

export const HomeScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    // const {isLoading, data: products = []} = useQuery({
    //     queryKey: ['products', 'infinite'],
    //     staleTime: 100 * 60, //1 hour
    //     queryFn: () => getProductsByPage(0),
    // })
    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['products', 'infinite'],
        staleTime: 100 * 60, //1 hour
        initialPageParam: 0,

        queryFn: async (params) => {
            return await getProductsByPage(params.pageParam);
        },
        getNextPageParam: (lastPage, allPages) => allPages.length,
    })

    return (
        <>
            <MainLayout
                title='TesloShop - Products'
                subTitle='Administrative Application'
            >
                {
                    isLoading ? (<FullScreenLoader />)
                        : (
                            <ProductList
                                products={data?.pages.flat() ?? []}
                                fetchNextPage={fetchNextPage}
                            />
                        )
                }

            </MainLayout>

            <FAB
                style={{ position: 'absolute', right: 30, bottom: 20 }}
                onPress={() => navigation.navigate('ProductScreen', {productId: 'new'})}
                iconName='plus-outline'
            />

        </>
    )
}