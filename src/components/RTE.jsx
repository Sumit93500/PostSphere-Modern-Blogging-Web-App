import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Controller } from "react-hook-form";

export default function RTE({
  name = "content",
  control,
  label,
  defaultValue = "",
}) {
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="mb-2 block font-medium text-black">{label}</label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
          const editor = useEditor({
            extensions: [StarterKit],
            content: value || "",
            onUpdate: ({ editor }) => {
              onChange(editor.getHTML());
            },
          });

          if (!editor) return null;

          return (
            <div className="border rounded-lg bg-white text-black shadow-sm">
              {/* Toolbar */}
              <div className="flex flex-wrap gap-2 border-b p-2 bg-gray-100 rounded-t-lg">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
                >
                  B
                </button>

                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
                >
                  I
                </button>

                <button
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
                >
                  H1
                </button>

                <button
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
                >
                  • List
                </button>

                <button
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
                >
                  1. List
                </button>

                <button
                  onClick={() => editor.chain().focus().undo().run()}
                  className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
                >
                  Undo
                </button>

                <button
                  onClick={() => editor.chain().focus().redo().run()}
                  className="px-3 py-1 bg-white border rounded hover:bg-gray-200"
                >
                  Redo
                </button>
              </div>

              {/* Editor Area */}
              <EditorContent
                editor={editor}
                className="p-4 min-h-[200px] focus:outline-none text-black"
              />
            </div>
          );
        }}
      />
    </div>
  );
}
