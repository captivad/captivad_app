"use client";
import { Editor } from "@tiptap/react";
import {
  AlignJustify,
  Heading,
  List,
  Quote,
  Redo,
  Ruler,
  Undo,
} from "lucide-react";
import {
  Heading1,
  Heading2,
  Heading3,
  Code,
  Bold,
  Italic,
  Strikethrough,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Highlighter,
  Upload,
} from "lucide-react";
import { ListOrdered } from "lucide-react";
import ModalInputImage from "./modal-input-image";

interface Props {
  editor: Editor | null;
}

export default function ToolBar({ editor }: Props) {
  if (!editor) return null;

  const fontSizes = [
    "8px",
    "10px",
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "30px",
    "36px",
    "48px",
    "60px",
    "72px",
  ];

  const getFontSize = () => {
    return editor.getAttributes("fontSize").fontSize || "16px";
  };

  const Options = [
    {
      icon: <Undo className="size-4" />,
      onClick: () => editor.chain().focus().undo().run(),
      preesed: false,
    },
    {
      icon: <Redo className="size-4" />,
      onClick: () => editor.chain().focus().redo().run(),
      preesed: false,
    },
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preesed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Heading className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      preesed: editor.isActive("heading", { level: 4 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive("strike"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <AlignJustify className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      preesed: editor.isActive({ textAlign: "justify" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
    },
    {
      icon: <Quote className="size-4" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      preesed: editor.isActive("blockquote"),
    },
    {
      icon: <Ruler className="size-4" />,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      preesed: editor.isActive("horizontalRule"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      preesed: editor.isActive("code"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      preesed: editor.isActive("highlight"),
    },
    {
      icon: <Upload className="size-4" />,
      onClick: () => {
        const modal = document.getElementById(
          `my_modal_add_image`
        ) as HTMLDialogElement;
        modal?.showModal();
      },
      preesed: editor.isActive("image"),
    },
  ];

  return (
    <div className="border border-slate-200 rounded-md p-1.5 mb-1 bg-slate-50 space-x-1 sticky top-10 z-30">
      <select
        className="kbd bg-white cursor-pointer mr-1 placeholder:text-black"
        onChange={(e) =>
          (editor as any).chain().focus().setFontSize(e.target.value).run()
        }
        value={editor.getAttributes("textStyle").fontSize}
      >
        <option value="">Font Size</option>
        {fontSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      {Options.map((option, i) => (
        <kbd
          className={`kbd bg-white cursor-pointer ${
            option.preesed ? "is-active" : ""
          }`}
          key={i}
          onClick={option.onClick}
          style={{
            backgroundColor: option.preesed ? "black" : "white",
            color: option.preesed ? "white" : "black",
          }}
        >
          {option.icon}
        </kbd>
      ))}
      <ModalInputImage
        value={(url: string) =>
          editor?.chain().focus().setImage({ src: url }).run()
        }
      />
    </div>
  );
}
