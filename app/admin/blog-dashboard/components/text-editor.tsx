"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ImageResize from "tiptap-extension-resize-image";
import ToolBar from "./text-editor-toolbar";
import TextStyle from "@tiptap/extension-text-style";
import Text from "@tiptap/extension-text";
import { Extension } from "@tiptap/core";

const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize?.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands(): any {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }: any) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }: any) => {
          return chain().setMark("textStyle", { fontSize: null }).run();
        },
    };
  },
});

interface IProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TextEditor({ content, onChange }: IProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-3",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-3",
        },
      }),
      Highlight,
      Image,
      ImageResize,
      TextStyle,
      Text,
      FontSize,
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "min-h-[600px] border rounded-md bg-slate-50 py-2 px-3",
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
      onChange(editor.getHTML());
    },
  });

  return (
    <>
      <div>
        <ToolBar editor={editor} />
        <EditorContent editor={editor} className="text-black w-full" />
      </div>
    </>
  );
}
