export const Imagepreview =({image,name})=>{
    return(
        <div className="w-32 mt-2 h-32 p-2 bg-main border border-border rounded">
            <img src={image ? image : "/img-movie/user-fill.jpg"} alt={name} className="w-full h-full object-cover rounded"/>
        </div>
    )
}