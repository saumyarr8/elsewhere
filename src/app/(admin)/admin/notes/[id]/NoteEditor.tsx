'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TiptapLink from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { updateNote, publishNote, unpublishNote, deleteNote, type Note } from '@/actions/note.actions'

type Props = { note: Note }

export default function NoteEditor({ note }: Props) {
  const [title, setTitle] = useState(note.title)
  const [slug, setSlug] = useState(note.slug)
  const [readTime, setReadTime] = useState(note.readTime)
  const [saving, startSave] = useTransition()
  const [publishing, startPublish] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        code: false,
        codeBlock: false,
      }),
      TiptapLink.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Write your note…' }),
    ],
    content: note.content,
    editorProps: {
      attributes: { class: 'tiptap min-h-[300px] text-sm focus:outline-none' },
    },
  })

  function handleSave() {
    if (!editor) return
    startSave(async () => {
      const res = await updateNote(note.id, {
        title,
        slug,
        readTime,
        content: editor.getHTML(),
      })
      if (res?.error) setError(res.error)
      else setError(null)
    })
  }

  function handlePublishToggle() {
    startPublish(async () => {
      if (note.published) await unpublishNote(note.id)
      else await publishNote(note.id)
    })
  }

  return (
    <div className="flex h-full">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-8 max-w-3xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/notes" className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors">
            ← Notes
          </Link>
          <span className={`text-xs uppercase tracking-widest px-2 py-0.5 rounded-full ${note.published ? 'bg-green-100 text-green-700' : 'bg-[var(--color-admin-bg)] text-[var(--color-ink-muted)]'}`}>
            {note.published ? 'Published' : 'Draft'}
          </span>
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-3xl font-light border-0 border-b border-[var(--color-border)] pb-3 mb-6 focus:outline-none focus:border-[var(--color-ink)] bg-transparent transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}
          placeholder="Note title"
        />

        <div className="space-y-2">
          {editor && (
            <div className="flex gap-1 mb-1.5 border-b border-[var(--color-border)] pb-2">
              {[
                { label: 'H1', title: 'Heading 1', action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }) },
                { label: 'H2', title: 'Heading 2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }) },
                { label: 'B', title: 'Bold', action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold') },
                { label: 'I', title: 'Italic', action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic') },
                { label: 'Quote', title: 'Blockquote', action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote') },
                { label: 'Link', title: 'Link', action: () => {
                  const url = prompt('URL:')
                  if (url) editor.chain().focus().setLink({ href: url }).run()
                }, active: editor.isActive('link') },
              ].map(({ label, title, action, active }) => (
                <button
                  key={label}
                  title={title}
                  onClick={action}
                  type="button"
                  className={`px-2 py-0.5 text-xs border transition-colors ${active ? 'bg-[var(--color-ink)] text-white border-[var(--color-ink)]' : 'border-[var(--color-border)] hover:border-[var(--color-ink)]'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          <div className="min-h-[300px] py-2">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 border-l border-[var(--color-border)] overflow-y-auto bg-[var(--color-admin-bg)] p-5 space-y-6">
        {error && <p className="text-xs text-[var(--color-accent)]">{error}</p>}

        <div className="flex flex-col gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-2 bg-[var(--color-ink)] text-[var(--color-paper)] text-xs uppercase tracking-widest hover:opacity-80 transition-opacity disabled:opacity-40"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button
            onClick={handlePublishToggle}
            disabled={publishing}
            className={`w-full py-2 text-xs uppercase tracking-widest border transition-colors disabled:opacity-40 ${
              note.published
                ? 'border-[var(--color-border)] text-[var(--color-ink-muted)] hover:border-[var(--color-ink)]'
                : 'border-green-500 text-green-600 hover:bg-green-50'
            }`}
          >
            {publishing ? '…' : note.published ? 'Unpublish' : 'Publish'}
          </button>
          {note.published && (
            <Link
              href={`/notes/${note.slug}`}
              target="_blank"
              className="w-full py-2 text-xs uppercase tracking-widest border border-[var(--color-border)] text-center text-[var(--color-ink-muted)] hover:border-[var(--color-ink)] transition-colors"
            >
              View Live ↗
            </Link>
          )}
        </div>

        {/* Slug */}
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-widest text-[var(--color-ink-muted)]">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border border-[var(--color-border)] px-2 py-1.5 text-xs font-mono bg-white focus:outline-none focus:border-[var(--color-ink)] transition-colors"
          />
        </div>

        {/* Read Time */}
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-widest text-[var(--color-ink-muted)]">Read Time</label>
          <input
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            className="w-full border border-[var(--color-border)] px-2 py-1.5 text-xs bg-white focus:outline-none focus:border-[var(--color-ink)] transition-colors"
            placeholder="e.g. 2 min read"
          />
        </div>

        {/* Danger zone */}
        <div className="pt-4 border-t border-[var(--color-border)]">
          <form action={deleteNote.bind(null, note.id)}>
            <button
              type="submit"
              onClick={(e) => { if (!confirm('Delete this note? This cannot be undone.')) e.preventDefault() }}
              className="text-xs text-[var(--color-accent)] hover:underline"
            >
              Delete Note
            </button>
          </form>
        </div>
      </aside>
    </div>
  )
}
