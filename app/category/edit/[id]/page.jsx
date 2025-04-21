import CreateEditCategory from '../../../components/CreateEditCategory'

export default function Page({params}) {
    return <CreateEditCategory type="edit" category_id={params.id} />
}