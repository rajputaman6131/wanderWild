import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";
import styles from './blogsPage.module.css'

const Blogs = ({ searchParams }) => {
    const page = parseInt(searchParams.page) || 1;

    return (
        <div className="wrapper">
            <Featured />
            <CategoryList />
            <div className={styles.content}>
                <CardList page={page} />
                <Menu />
            </div>
        </div>
    )
}

export default Blogs