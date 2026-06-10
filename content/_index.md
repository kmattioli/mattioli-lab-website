---
# Mattioli Lab — home page. Each section is a HugoBlox page-builder block.
title:
date: 2026-01-01
type: landing

sections:
  - block: hero
    content:
      title: Decoding alternative _isoforms_ in cancer.
      text: |
        We use high-throughput functional genomics to understand how aberrant RNA
        processing and gene regulation drive oncogenic cell states.

  - block: feature
    content:
      title: What we study
      subtitle: Welcome
      figure: isoform
      figure_label: Fig. 1 — Transcription factor isoforms
      caption: A cassette exon is kept (isoform A) or skipped (isoform B), yielding two proteins (here, transcription factors) with different domains and DNA-binding specificity.
      text: |
        Over 90% of human genes produce multiple mRNA _isoforms_, many encoding
        distinct proteins. Their misregulation is pervasive in cancer, yet which
        individual isoforms drive disease — and how — remains largely unknown. We
        leverage and develop high-throughput approaches to interrogate **isoform
        function at scale**, focusing on regulatory genes like transcription factors.
        Our long-term goal is to understand how transcriptomic misregulation drives
        **breast cancer**.
      cta:
        url: ./research/
        label: Explore our research →
    design:
      flip: false

  - block: feature
    content:
      title: Where we're located
      subtitle: Location
      image:
        filename: denver-campus.jpg
      caption: University of Colorado Denver · Auraria Campus in downtown Denver, CO
      text: |
        The lab is located on the **University of Colorado Denver**
        [Auraria Campus](https://aurariacampus.edu/), right in the heart of downtown
        Denver. We are steps from some of the city's best restaurants, museums, parks,
        and the South Platte River. You can see the Rockies from our lab! It's a
        vibrant, walkable setting for science, and an amazing city to call home.
    design:
      flip: true

  - block: collection
    content:
      title: Latest news
      subtitle: News
      count: 4
      filters:
        folders:
          - post
      order: desc
      archive:
        enable: true
        text: All news →
    design:
      view: news
      columns: '1'

  - block: collection
    content:
      title: Selected publications
      subtitle: Publications
      count: 3
      filters:
        folders:
          - publication
        featured_only: true
      archive:
        enable: true
        text: All publications →
    design:
      view: citation
      columns: '1'

  - block: cta
    content:
      title: We are a brand new lab, and we are recruiting!
      subtitle: Join us
      text: |
        We are building an interdisciplinary, supportive team spanning wet-lab and
        computational work in downtown Denver. If splicing, gene regulation, genomics,
        or cancer biology excite you, get in touch.
      cta:
        url: ./contact/
        label: Get in touch →
      cta_alt:
        url: ./people/
        label: Meet the team
---
