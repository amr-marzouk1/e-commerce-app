import { Box, Heading, HStack, IconButton, Image, Text } from '@chakra-ui/react'
import { LiaEdit } from 'react-icons/lia'
import { RiDeleteBinFill } from 'react-icons/ri'
import { useColorModeValue } from '../components/ui/color-mode'
import { useProductStore } from '../store/product'
import { Toaster, toaster } from '../components/ui/toaster'
import {
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from '../components/ui/popover'
import { Input, Stack } from '@chakra-ui/react'
import { Button } from '../components/ui/button'
import { useState } from 'react'

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product)
  const textColor = useColorModeValue('gray.600', 'gray.200')
  const bg = useColorModeValue('white', 'gray.800')
  const { deleteProduct, updateProduct } = useProductStore()

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid)
    if (!success) {
      toaster.create({
        title: 'Error',
        description: message,
        type: 'error',
      })
    } else {
      toaster.create({
        title: 'Success',
        description: message,
        type: 'success',
      })
    }
  }
  //close modal after updating
  const [close, setClose] = useState(true)

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct)
    if (!success) {
      toaster.create({
        title: 'Error',
        description: message,
        type: 'error',
      })
    } else {
      toaster.create({
        title: 'Success',
        description: message,
        type: 'success',
      })
    }
    setClose(true)
  }

  return (
    <Box
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all .3s'}
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={'full'}
        objectFit={'cover'}
      />
      <Box p={4}>
        <Heading as={'h3'} size={'md'} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
          {product.price}
        </Text>
        <HStack spaceX={2}>
          <PopoverRoot open={!close} closeOnEscape={true}>
            <PopoverTrigger asChild>
              <IconButton colorPalette={'blue'} onClick={() => setClose(false)}>
                <LiaEdit />
              </IconButton>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>Update Product</PopoverHeader>
              <PopoverArrow />
              <PopoverBody>
                <Stack gap="4">
                  <Input
                    placeholder="Product Name"
                    name="name"
                    value={updatedProduct.name}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Price"
                    name="price"
                    type="number"
                    value={updatedProduct.price}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Image URL"
                    name="image"
                    value={updatedProduct.image}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value,
                      })
                    }
                  />
                </Stack>
              </PopoverBody>
              <PopoverFooter>
                <Button
                  colorPalette={'blue'}
                  mr={3}
                  onClick={() =>
                    handleUpdateProduct(product._id, updatedProduct)
                  }
                >
                  Update
                </Button>
                <Button variant={'ghost'} onClick={() => setClose(true)}>
                  Cancel
                </Button>
              </PopoverFooter>
              <PopoverCloseTrigger onClick={() => setClose(true)} />
            </PopoverContent>
          </PopoverRoot>
          <IconButton
            colorPalette={'red'}
            onClick={() => handleDeleteProduct(product._id)}
          >
            <RiDeleteBinFill />
          </IconButton>
        </HStack>
      </Box>
      {/* /////////////////////////////// */}

      <Toaster />
    </Box>
  )
}
export default ProductCard
