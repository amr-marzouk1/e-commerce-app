import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import { useEffect } from 'react'
import ProductCard from '../pageComponents/ProductCard'

const HomePage = () => {
  const { fetchProducts, products } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])
  return (
    <Container maxW={'6xl'} px={4} py={12}>
      <VStack spaceY={8}>
        <Text
          fontSize={30}
          fontWeight={'bold'}
          textAlign={'center'}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={'text'}
        >
          Current Products 🛸
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          gap={10}
          w={'full'}
          justifyContent={'center'}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize={'xl'}
            fontWeight={'bold'}
            textAlign={'center'}
            color={'gray.500'}
          >
            No Products 🙁
            <Link to={'/create'}>
              <Text
                as={'span'}
                color={'blue.500'}
                _hover={{ textDecoration: 'underline' }}
              >
                Create A Product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage
