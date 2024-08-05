import CreateEditCategory from '@/app/components/CreateEditCategory'

interface Params {
    params: {
        id: string
    }
}

export default function Page({params}: Params) {
    return <CreateEditCategory type="edit" category_id={params.id} />
}