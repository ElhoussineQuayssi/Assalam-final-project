import getDb from "@/lib/db";

export default async function AllDataPage() {
  const db = await getDb();
  // Fetch all data from all tables
  const admins = db.prepare("SELECT * FROM admins").all();
  const blogPosts = db.prepare("SELECT * FROM blog_posts").all();
  const messages = db.prepare("SELECT * FROM messages").all();

  return (
    <div style={{ padding: 24 }}>
      <h1>All Database Data</h1>
      <section>
        <h2>Admins</h2>
        <pre>{JSON.stringify(admins, null, 2)}</pre>
      </section>
      <section>
        <h2>Blog Posts</h2>
        <pre>{JSON.stringify(blogPosts, null, 2)}</pre>
      </section>
      <section>
        <h2>Messages</h2>
        <pre>{JSON.stringify(messages, null, 2)}</pre>
      </section>
    </div>
  );
}
