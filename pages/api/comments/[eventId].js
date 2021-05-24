import {
  connectDatabase,
  insertDocument,
  getDocuments,
} from "../../../helpers/db-utils";

const handler = async (req, res) => {
  const eventId = req.body.eventId;
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    await insertDocument(client, "comments", newComment)
      .then((result) => {
        console.log(
          `Successfully inserted item with _id: ${result.insertedId}`
        );
        res
          .status(201)
          .json({ message: "Added comment.", comment: newComment });
      })
      .catch((err) => {
        client.close();
        console.error(`Failed to insert item: ${err}`);
        res.status(500).json({ message: err });
      });
  } else {
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: error });
      return;
    }
    await getDocuments(client, "comments", { _id: -1 })
      .then((result) => {
        res.status(201).json({ message: "Added comment.", comment: result });
      })
      .catch((err) => {
        client.close();
        console.error(`Failed to insert item: ${err}`);
        res.status(500).json({ message: err });
      });
  }
};
export default handler;
