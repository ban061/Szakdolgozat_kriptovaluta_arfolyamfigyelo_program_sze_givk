export default function Blog({ blog }: { blog: { title: string; content: string; date: Date } }) {
  return (
    <div className="blog-content">
      <BlogHeader title={blog.title} />
      <hr />
      <BlogContent content={blog.content} />
      <hr />
      <BlogFooter date={blog.date} />
    </div>
  );
}

function BlogHeader({ title }: { title: string }) {
  return <h2 className="blog-title">{title}</h2>;
}

function BlogContent({ content }: { content: string }) {
  return <p className="blog-text-content">{content}</p>;
}

function BlogFooter({ date }: { date: Date }) {
  return (
    <div style={{ textAlign: "right" }}>
      <span className="blog-date">{date.toLocaleDateString()}</span>
    </div>
  );
}
