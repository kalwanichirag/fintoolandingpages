"use client"; // Needed for Next.js 13+ if using app directory

import { useState, useEffect } from "react";
import Image from "next/image";
import BoldSectionHeader from "../../BoldSectionHeader";
import styles from "./style.module.css";
import { ADVISORY_GET_BLOG_API_URL } from "../../../app/constants";
import { apiCall } from "../../../app/common_utilities";
import { useRouter } from "next/navigation";

const KnowledgeBase = () => {
  const [blogdata, setBlogData] = useState([]);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    try {
      const res = await apiCall(ADVISORY_GET_BLOG_API_URL, "", false, false);
      setBlogData(res.slice(0, 3));
      console.log("res", res.slice(0, 3));
    } catch (e) {
      setError(true);
    }
  };

  return (
    <section className={`${styles.kb} py-5`}>
      <div className={`container ${styles.container}`}>
        <BoldSectionHeader headerText={"Knowledge Base"} />
        <div className="row pt-4">
          {blogdata.map((v, idx) => (
            <div
              key={`blog-${idx}`}
              className={`${styles.blogpost} col-12 col-md-4 text-center`}
            >
              {console.log("r---->", v.yoast_head_json.og_url)}
              <a
                className={styles.blogLink}
                target="_blank"
                rel="noopener noreferrer"
                href={v.yoast_head_json.og_url}
              >
                {"og_image" in v.yoast_head_json &&
                v.yoast_head_json.og_image.length > 0 &&
                v.yoast_head_json.og_image[0].url ? (
                  <div className={`img-wrapper ${styles.blogimage}`}>
                    <Image
                      src={v.yoast_head_json.og_image[0].url}
                      alt={v.yoast_head_json.og_title || "Blog Image"}
                      width={315}
                      height={210}
                      className="img-fluid"
                    />
                  </div>
                ) : (
                  <div style={{ width: "315px", height: "210px" }}></div>
                )}
                <h3 className={styles.headline}>{v.yoast_head_json.og_title}</h3>
                <p>{v.yoast_head_json.og_description}</p>
              </a>
            </div>
          ))}
        </div>
        <div className="text-center py-3">
          <a
            href="https://www.fintoo.in/blog/"
            className={styles.viewmore}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more
          </a>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeBase;
