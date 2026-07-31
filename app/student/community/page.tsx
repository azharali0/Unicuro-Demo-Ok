export default function CommunityPage() {
  return (
    <section className="rounded-[24px] border bg-white p-8 bg-white text-slate-950">
      <h1 className="text-3xl font-black">Student Community</h1>
      <p className="mt-3 text-slate-600 text-slate-600">Ask questions, share opportunities and connect with students.</p>
      <form className="mt-8 grid gap-4 rounded-3xl bg-white p-6 bg-white">
        <input className="rounded-2xl border p-4 bg-white" placeholder="Post title" />
        <textarea className="rounded-2xl border p-4 bg-white" placeholder="What would you like to share?" />
        <button className="rounded-2xl bg-indigo-600 px-5 py-4 font-black text-white">Publish Post</button>
      </form>
    </section>
  );
}
