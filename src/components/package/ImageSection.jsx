"use client"
import React from 'react'

const ImageSection = ({ mode, values, images, setImages }) => {

    const handleImageSelect = (e) => {
        const { name, files } = e.target;

        setImages({
            ...images,
            [name]: files[0]
        })
    };

    return (
        <div>
            <div className="mx-auto mt-10 max-w-2xl lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-5">
                <div className="lg:col-span-2">
                    <label htmlFor='image1' className={`h-[500px] overflow-hidden rounded-lg lg:block ${mode === 'admin' && 'cursor-pointer'}`}>
                        <img src={images?.image1
                            ? URL.createObjectURL(images?.image1)
                            : values?.images?.length
                                ? values?.images[0]
                                : "http://via.placeholder.com/800x500"} alt={'Image 1'} className="h-full w-full object-cover object-center" />
                        {
                            mode === "admin" && <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="image1"
                                type="file"
                                name="image1"
                                onChange={handleImageSelect}
                            />
                        }
                    </label>
                </div>
                <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-5 h-[500px]">
                    <label htmlFor='image2' className={`aspect-h-2 aspect-w-3 overflow-hidden rounded-lg ${mode === 'admin' && 'cursor-pointer'}`}>
                        <img
                            src={images?.image2
                                ? URL.createObjectURL(images?.image2)
                                : values?.images?.length > 1
                                    ? values?.images[1]
                                    : "http://via.placeholder.com/400x240"} alt={'Image 2'}
                            className="h-full w-full object-cover object-center"
                        />
                        {
                            mode === 'admin' && <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="image2"
                                type="file"
                                name="image2"
                                onChange={handleImageSelect}
                            />
                        }
                    </label>
                    <label htmlFor='image3' className={`aspect-h-2 aspect-w-3 overflow-hidden rounded-lg ${mode === 'admin' && 'cursor-pointer'}`}>
                        <img
                            src={images?.image3
                                ? URL.createObjectURL(images?.image3)
                                : values?.images?.length > 2
                                    ? values?.images[2]
                                    : "http://via.placeholder.com/400x240"} alt={'Image 3'}
                            className="h-full w-full object-cover object-center"
                        />
                        {
                            mode === 'admin' && <input
                                hidden={mode !== 'admin'}
                                accept="image/*"
                                style={{ display: "none" }}
                                id="image3"
                                type="file"
                                name="image3"
                                onChange={handleImageSelect}
                            />
                        }
                    </label>
                </div>
            </div>
        </div>



    )
}

export default ImageSection