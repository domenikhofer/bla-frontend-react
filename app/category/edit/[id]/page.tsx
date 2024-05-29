import CreateEditCategory from '@/app/components/CreateEditCategory'

interface Params {
    params: {
        id: string
    }
}

export default function Page({params}: Params) {
    return <CreateEditCategory type="edit" categoryId={params.id} />
}