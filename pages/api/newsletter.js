import { connectDatabase, insertDocument } from "../../helpers/db-utils";
const handler = async (req, res) => {
  const enteredEmail = req.body.email;
  if (req.method === "POST") {
    if (!enteredEmail || !enteredEmail.includes("@")) {
      res.status(422).json({ error: "Invalid email address" });
      return;
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
    await insertDocument(client, "newsletter", { message: enteredEmail })
      .then((result) => {
        console.log(
          `Successfully inserted item with _id: ${result.insertedId}`
        );
        res.status(201).json({ message: enteredEmail });
      })
      .catch((err) => {
        client.close();
        console.error(`Failed to insert item: ${err}`);
        res.status(500).json({ message: err });
      });
  }
};
export default handler;
