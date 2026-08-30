import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Publishmint Privacy Policy | jacrdn",
  description: "Privacy policy for Publishmint.",
  alternates: {
    canonical: "/publishmint/privacy/",
  },
};

export default function PublishmintPrivacyPage() {
  return (
    <main className={styles.main}>
      <article className={styles.policy}>
        <header className={styles.header}>
          <Link href="/" className={styles.homeLink}>
            jacrdn
          </Link>
          <p className={styles.product}>Publishmint</p>
          <h1 className={styles.heading}>Privacy Policy</h1>
          <p className={styles.effective}>Effective August 30, 2026</p>
        </header>

        <section>
          <h2>Overview</h2>
          <p>
            Publishmint is a personal card-listing preparation tool operated by
            Jack Cardin. It uses card images to prepare listing data and can use
            an authorized eBay account to stage inventory items and unpublished
            offers for review.
          </p>
        </section>

        <section>
          <h2>Information Publishmint processes</h2>
          <p>Publishmint may process:</p>
          <ul>
            <li>Card images and listing details you choose to provide.</li>
            <li>
              eBay account identifiers, seller policies, inventory locations,
              inventory items, and offers made available through the OAuth
              permissions you grant.
            </li>
            <li>
              OAuth access and refresh tokens needed to perform authorized eBay
              actions. Publishmint never receives your eBay password.
            </li>
            <li>
              Limited technical records, such as request timing, status, and
              errors, used to operate and troubleshoot the tool.
            </li>
          </ul>
        </section>

        <section>
          <h2>How information is used</h2>
          <p>Information is used only to:</p>
          <ul>
            <li>Extract visible card details from submitted images.</li>
            <li>Prepare listing drafts and eBay-compatible inventory data.</li>
            <li>
              Read seller configuration and create or update inventory items and
              unpublished offers when you direct Publishmint to do so.
            </li>
            <li>Secure, test, maintain, and troubleshoot the service.</li>
          </ul>
        </section>

        <section>
          <h2>Service providers and disclosure</h2>
          <p>
            Card images may be sent to OpenRouter and the model providers
            configured through it for visual extraction. eBay account metadata,
            OAuth credentials, listing titles, and listing descriptions are not
            intentionally included in those image-extraction requests.
          </p>
          <p>
            Publishmint also exchanges information with eBay to perform the
            actions you authorize, and may use hosting or transport providers to
            make selected images available to eBay during Sandbox staging.
            Publishmint does not sell personal information.
          </p>
        </section>

        <section>
          <h2>Storage and retention</h2>
          <p>
            During the current development phase, credentials and configuration
            are stored in a local development environment and are not published
            with this website. Information is kept only for as long as needed to
            operate, test, or troubleshoot Publishmint, or as required by law.
          </p>
        </section>

        <section>
          <h2>Your choices</h2>
          <p>
            You can revoke Publishmint&apos;s access from your eBay account at any
            time. You can also request deletion of information associated with
            your use of Publishmint by contacting the address below. Revoking
            access prevents future eBay API activity but does not automatically
            remove records that eBay independently retains.
          </p>
        </section>

        <section>
          <h2>Security</h2>
          <p>
            Reasonable safeguards are used to protect credentials and other
            information, but no storage or transmission method is completely
            secure.
          </p>
        </section>

        <section>
          <h2>Children</h2>
          <p>
            Publishmint is not directed to children under 13 and does not
            knowingly collect their personal information.
          </p>
        </section>

        <section>
          <h2>Changes to this policy</h2>
          <p>
            This page may be updated as Publishmint changes. The effective date
            above will be revised when material updates are made.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions or deletion requests can be sent to{" "}
            <a href="mailto:jackrcardin@gmail.com">jackrcardin@gmail.com</a>.
          </p>
        </section>
      </article>
    </main>
  );
}
