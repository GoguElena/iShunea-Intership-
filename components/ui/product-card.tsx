"use client"
import React, {MouseEventHandler} from 'react';
import {Product} from "@/types";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart} from "lucide-react";
import Image from 'next/image'
import Currency from "@/components/ui/currency";
import {useRouter} from "next/navigation";
import usePreviewModal from "@/hooks/use-preview-modal";

interface ProductCard {
    data: Product
}

const ProductCard: React.FC<ProductCard> = ({
    data
}) => {
    const router = useRouter()
    const previewModal = usePreviewModal()
    // const cart = useCart()

    const handleClick = () => {
        router.push(`/product/${data?.id}`)
    }

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation()

        previewModal.onOpen(data)
    }


    return (
        <div onClick={handleClick} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
            {/*Images and Actions*/}
            <div className="aspect-square rounded-xl bg-gray-100 relative">
                {/*<Image*/}
                {/*    alt="Image"*/}
                {/*    src={data?.images?.[0]?.url}*/}
                {/*    fill*/}
                {/*    className="aspect-square object-cover rounded-md"*/}
                {/*/>*/}
                <Image
                    alt="Image"
                    src={data?.images?.[0]?.url || '/placeholder.png'} // Provide a fallback image or string
                    fill
                    className="aspect-square object-cover rounded-md"
                />
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton
                            onClick={onPreview}
                            icon={<Expand size={20} className="text-gray-600"/>}
                        />
                        <IconButton
                            onClick={() => {}}
                            icon={<ShoppingCart size={24} className="text-gray-600"/>}
                        />
                    </div>
                </div>
            </div>
            <div>
                <p className="font-semibold text-lg">
                    {data.name}
                </p>
                <p className="text-sm text-gray-500">
                    {data.category.name}
                </p>
            </div>
            {/*Price*/}
            <div className="flex items-center justify-between">
                {/*<Currency value={data?.price}/>*/}
                <Currency value={data?.price ?? 0} />
            </div>
        </div>
    );
};

export default ProductCard;