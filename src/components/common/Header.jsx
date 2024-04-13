
const Header = ({ title, description, bottomComponent }) => {
    return (
        <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
                <div className="mx-auto mb-[40px] max-w-[520px] text-center lg:mb-10">
                    <h2 className="mb-4 text-3xl font-bold sm:text-[40px]/[48px]">
                        {title}
                    </h2>
                    <p className="text-base text-body-color dark:text-dark-6">
                        {description}
                    </p>
                    {bottomComponent}
                </div>
            </div>
        </div>
    )
}

export default Header