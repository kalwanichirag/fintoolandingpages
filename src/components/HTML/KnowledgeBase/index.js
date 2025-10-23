"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import BoldSectionHeader from "../../BoldSectionHeader";
import styles from "./style.module.css";

const KnowledgeBase = () => {
  const [blogData, setBlogData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    try {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogData(data.slice(0, 3));
    } catch (err) {
      setError(true);
    }
  };

  if (error) {
    return (
      <section className={`${styles.kb} py-5`}>
        <div className="container text-center">
          <BoldSectionHeader headerText="Knowledge Base" />
          <p className="text-danger mt-4">
            Could not load blogs at this time. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.kb} py-5`}>
      <div className={`container ${styles.container}`}>
        <BoldSectionHeader headerText="Knowledge Base" />
        <div className="row pt-4">
          {blogData.length === 0 && <p className="text-center">Loading blogs...</p>}
          {blogData.map((v, idx) => {
            const yoast = v?.yoast_head_json || {};
            const image = yoast?.og_image?.[0]?.url || "";
            const title = yoast?.og_title || v?.title?.rendered || "Untitled";
            const desc = yoast?.og_description || v?.excerpt?.rendered || "No description";
            const url = yoast?.og_url || v?.link || "#";

            return (
              <div key={`blog-${idx}`} className={`${styles.blogpost} col-12 col-md-4 text-center`}>
                <a className={styles.blogLink} target="_blank" rel="noopener noreferrer" href={url}>
                  {image ? (
                    <div className={`relative ${styles.blogimage}`}>
                      <Image src={image} alt={title} fill className={`img-wrapper  relative img-fluid`} />
                    </div>
                  ) : (
                    <div style={{ width: "315px", height: "210px", background: "#eee" }} />
                  )}
                  <h3 className={styles.headline}>{title}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: desc.length > 120 ? desc.slice(0, 120) + "..." : desc,
                    }}
                  />
                </a>
              </div>
            );
          })}
        </div>

        <div className="text-center py-3">
          <a href="https://www.fintoo.in/blog/" className={styles.viewmore} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeBase;
