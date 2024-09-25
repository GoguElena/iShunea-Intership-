import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyle?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
    textStyles?: string;
    rightIcon?: string;
    isDisabled?: boolean;
}

export interface SearchManufacturerProps {
    manufacturer: string;
    setManufacturer: (manufacturer: string) => void;
}

export interface CarProps{
    id: string;
    city_mpg:number;
    carClass:string;
    combination_mpg:number;
    cylinders:number;
    displacement:number;
    drive:string;
    fuel_type:string;
    highway_mpg:number;
    make:string;
    model:string;
    transmission:string;
    year: number;
}

export interface FilterProps{
    manufacturer: string;
    year:number;
    fuel:string;
    limit:number;
    model:string;
}

export interface OptionProps {
    title: string;
    value: string; // Asigură-te că value este de tip string
}

export interface CustomFilterProps {
    title: string;
    options: OptionProps[];
    setFilter: (filter: string) => void;  // Setează tipul la string
}

export interface ShowMoreProps{
    pageNumber:number;
    isNext:boolean;
    setLimit: (limit: number) => void; // Added setLimit to update the pagination limit
}
