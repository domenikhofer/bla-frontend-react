import CreateEditCategory from '../../../components/CreateEditCategory'
import { use } from "react";

export default function Page({params}) {
        const { id } = use(params)

    return <CreateEditCategory type="edit" category_id={id} />
}