---
# Leave the homepage title empty to use the site title
title:
date: 2026-01-01
type: landing

sections:
  - block: hero
    content:
      title: |
        Mattioli Lab
      image:
        filename: welcome.jpg   # replace assets/media/welcome.jpg with your own image
      text: |
        <br>

        **Decoding alternative isoforms in cancer.**

        We use high-throughput, isoform-specific functional genomics to understand how alternative RNA isoforms drive oncogenic cell states — and whether they can be exploited as diagnostics and therapeutics.

  - block: markdown
    content:
      title: What we study
      subtitle: ''
      text: |
        Over 90% of human genes produce multiple mRNA isoforms, many encoding distinct proteins. Their misregulation is pervasive in cancer, yet which individual isoforms drive disease — and how — remains largely unknown. Our lab leverages and develops state-of-the-art tools (long-read RNA-sequencing and RNA-targeting CRISPR) to probe isoform function at scale, beginning with transcription factor isoforms in breast cancer.

        {{% cta cta_link="./research/" cta_text="Explore our research →" %}}
    design:
      columns: '1'

  - block: collection
    content:
      title: Latest news
      subtitle:
      text:
      count: 5
      filters:
        author: ''
        category: ''
        exclude_featured: false
        publication_type: ''
        tag: ''
      offset: 0
      order: desc
      page_type: post
    design:
      view: card
      columns: '1'

  - block: collection
    content:
      title: Selected publications
      text: ''
      count: 5
      filters:
        folders:
          - publication
        featured_only: true
    design:
      view: citation
      columns: '1'

  - block: markdown
    content:
      title:
      subtitle:
      text: |
        {{% cta cta_link="./people/" cta_text="Meet the team →" %}}
    design:
      columns: '1'
---
