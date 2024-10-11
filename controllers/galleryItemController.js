// Correct relative path
import GalleryItem from '../models/galleryItem.js';


export function createGalleryItem(req, res) {
    const user = req.user
    if (user == null) { //user null nm token ekk nh/ nttm token waradi
        res.status(403).json({
            message: "Please login to create a gallery item"
        })
        return
    }
   
    if (user != "admin") {
        res.status(403).json({
            message: "You are not authorized to create a gallery item"
        })
        return
    }
    
    const galleryitem = req.body.item

    const newGalleryItem = new GalleryItem(galleryitem)
    newGalleryItem.save().then(
        () => {
            res.json({
                message: "Gallery item created succesfully"
            })
        }
    ).catch(
        () => {
            res.status(500).json({
                message: "Gallery item creation failed"
            })
        }
    )

}
export function getGalleryItems(rdeq, res) {
    GalleryItem.find().then(
        (list) => {
            res.json({
                list:list
            })
        }
    )
}

