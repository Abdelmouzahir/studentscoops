import { auth } from "@/lib/firebaseAdmin";
import { getStorage, ref, listAll, deleteObject } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase/config";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { uid, docId } = req.body;

    try {
      console.error("Deleting user from Firebase Auth...");

      // Delete user from Firebase Auth
      await auth.deleteUser(uid).then(async () => {
        //delete user from firestore
        await deleteDoc(doc(db, "saitStaff", docId)).then(async () => {
          //delete user folder from storage
          const storage = getStorage();
          const folderRef = ref(storage, `Saitstaff/${uid}`);

          const deleteFolder = async (folderRef) => {
            const res = await listAll(folderRef);
            for (const itemRef of res.items) {
              await deleteObject(itemRef);
            }

            for (const subfolderRef of res.prefixes) {
              await deleteFolder(subfolderRef);
            }
          };

          await deleteFolder(folderRef);
        });
      });

      res.status(200).json({ message: "User has been deleted" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
