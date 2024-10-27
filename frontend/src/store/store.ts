import { atom } from "recoil";
export const userDataAtom = atom({
    key: "userData",
    default: {
        id: null,
        email: "",
        name: "",
    },
})

export const pageLoading = atom({
    key: "page loading",
    default: false,
})

export const SalesAtom = atom({
    key: "SalesAtom",
    default: [],
})

export const ProductsAtom = atom({
    key: "ProductsAtom",
    default: [],
})

export const CustomerAtom = atom({
    key: "CustomerAtom",
    default: [],
})
