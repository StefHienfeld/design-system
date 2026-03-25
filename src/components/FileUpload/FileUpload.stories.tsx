import { useState, useEffect, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUpload } from './FileUpload';
import type { FileUploadItem } from './FileUpload';

/* ----------------------------------------------------------------
   Meta
   ---------------------------------------------------------------- */
const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
    accept: { control: 'text' },
    maxSize: { control: 'number' },
    multiple: { control: 'boolean' },
    hint: { control: 'text' },
  },
  args: {
    multiple: true,
    hint: 'SVG, PNG, JPG or GIF (max. 800x400px)',
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

/* ----------------------------------------------------------------
   Default (empty)
   ---------------------------------------------------------------- */
export const Default: Story = {
  args: {},
};

/* ----------------------------------------------------------------
   With files in queue (static)
   ---------------------------------------------------------------- */
export const WithFilesQueued: Story = {
  args: {
    files: [
      {
        name: 'Tech design requirements.pdf',
        size: 200 * 1024,
        progress: 100,
        status: 'complete',
      },
      {
        name: 'Dashboard recording.mp4',
        size: 16 * 1024 * 1024,
        progress: 40,
        status: 'uploading',
      },
      {
        name: 'Dashboard prototype FINAL.fig',
        size: 4.2 * 1024 * 1024,
        progress: 80,
        status: 'uploading',
      },
    ],
  },
};

/* ----------------------------------------------------------------
   With error state
   ---------------------------------------------------------------- */
export const WithError: Story = {
  args: {
    files: [
      {
        name: 'Photo too-large.png',
        size: 50 * 1024 * 1024,
        progress: 32,
        status: 'error',
      },
      {
        name: 'Document.pdf',
        size: 1.2 * 1024 * 1024,
        progress: 100,
        status: 'complete',
      },
    ],
  },
};

/* ----------------------------------------------------------------
   All complete
   ---------------------------------------------------------------- */
export const AllComplete: Story = {
  args: {
    files: [
      {
        name: 'Tech design requirements.pdf',
        size: 200 * 1024,
        progress: 100,
        status: 'complete',
      },
      {
        name: 'Dashboard recording.mp4',
        size: 16 * 1024 * 1024,
        progress: 100,
        status: 'complete',
      },
    ],
  },
};

/* ----------------------------------------------------------------
   Interactive (simulated upload)
   ---------------------------------------------------------------- */
export const Interactive: Story = {
  render: () => {
    const [files, setFiles] = useState<FileUploadItem[]>([]);

    const handleFilesAdd = useCallback((added: File[]) => {
      const newItems: FileUploadItem[] = added.map((f) => ({
        name: f.name,
        size: f.size,
        progress: 0,
        status: 'uploading' as const,
      }));
      setFiles((prev) => [...prev, ...newItems]);
    }, []);

    const handleFileRemove = useCallback((index: number) => {
      setFiles((prev) => prev.filter((_, i) => i !== index));
    }, []);

    // Simulate upload progress
    useEffect(() => {
      const interval = setInterval(() => {
        setFiles((prev) =>
          prev.map((f) => {
            if (f.status !== 'uploading') return f;
            const next = Math.min((f.progress ?? 0) + Math.floor(Math.random() * 15) + 5, 100);
            return {
              ...f,
              progress: next,
              status: next >= 100 ? 'complete' : 'uploading',
            };
          }),
        );
      }, 500);
      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{ maxWidth: 512 }}>
        <FileUpload
          files={files}
          onFilesAdd={handleFilesAdd}
          onFileRemove={handleFileRemove}
          accept="image/*,.pdf,.fig,.mp4"
          multiple
        />
      </div>
    );
  },
};

/* ----------------------------------------------------------------
   Single file mode
   ---------------------------------------------------------------- */
export const SingleFile: Story = {
  args: {
    multiple: false,
    hint: 'PDF only (max. 10MB)',
    accept: '.pdf',
  },
};

/* ----------------------------------------------------------------
   Kitchen sink
   ---------------------------------------------------------------- */
export const KitchenSink: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, maxWidth: 512 }}>
      <div>
        <div
          style={{
            marginBottom: 8,
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          Empty
        </div>
        <FileUpload />
      </div>

      <div>
        <div
          style={{
            marginBottom: 8,
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          With uploading files
        </div>
        <FileUpload
          files={[
            {
              name: 'Tech design requirements.pdf',
              size: 200 * 1024,
              progress: 100,
              status: 'complete',
            },
            {
              name: 'Dashboard recording.mp4',
              size: 16 * 1024 * 1024,
              progress: 40,
              status: 'uploading',
            },
            {
              name: 'Dashboard prototype FINAL.fig',
              size: 4.2 * 1024 * 1024,
              progress: 80,
              status: 'uploading',
            },
          ]}
        />
      </div>

      <div>
        <div
          style={{
            marginBottom: 8,
            fontWeight: 600,
            fontSize: 12,
            textTransform: 'uppercase',
            color: '#717680',
          }}
        >
          With error
        </div>
        <FileUpload
          files={[
            {
              name: 'Corrupted file.zip',
              size: 25 * 1024 * 1024,
              progress: 32,
              status: 'error',
            },
          ]}
        />
      </div>
    </div>
  ),
};
