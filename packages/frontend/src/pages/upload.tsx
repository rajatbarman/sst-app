import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styles from '../styles/Upload.module.css';
import Link from 'next/link';

interface Bucket {
  Name: string;
}

export default function Upload() {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [selectedBucket, setSelectedBucket] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileLink, setFileLink] = useState<string>('');

  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        const res = await fetch(
          'https://4aygeftyoc.execute-api.ap-south-1.amazonaws.com/buckets',
        );
        const resp = await res.json();
        console.log('bucks', resp);
        setBuckets(resp.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBuckets();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const handleBucketChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBucket(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setFileLink('');
    event.preventDefault();

    if (!file || !selectedBucket) {
      return;
    }

    setUploading(true);

    try {
      // First, get the upload URL
      const res = await fetch(
        `https://4aygeftyoc.execute-api.ap-south-1.amazonaws.com/upload-url?bucket=${selectedBucket}`,
      );

      const resp = await res.json();

      const { uploadURL, downloadUrl } = resp.data;

      console.log('uploadosdUrl', uploadURL);

      console.log('downlosdUrl', downloadUrl);

      // Then, upload the file using the upload URL
      await fetch(uploadURL, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });
      setFileLink(downloadUrl);

      alert(`File uploaded successfully.`);
    } catch (err) {
      alert('Failed to upload file');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Bucket:
          <select value={selectedBucket} onChange={handleBucketChange}>
            <option value="">Select a bucket</option>
            {Array.isArray(buckets) &&
              buckets.map((bucket) => (
                <option key={bucket.Name} value={bucket.Name}>
                  {bucket.Name}
                </option>
              ))}
          </select>
        </label>

        <label>
          File:
          <input type="file" onChange={handleFileChange} />
        </label>

        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {fileLink && <a href={fileLink}>Your file Link</a>}
      </form>
    </div>
  );
}
