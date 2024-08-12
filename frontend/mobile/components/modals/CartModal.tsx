import { FC } from 'react'
import { Text } from 'react-native'

type Props = {
    cart: { product: any, quantity: number }[]
}

const CartModal: FC<Props> = ({ cart }) => {
    return (
        <Text>CartModal</Text>
    )
}

export default CartModal