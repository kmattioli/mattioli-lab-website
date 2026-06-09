---
# Mattioli Lab — home page. Each section is a HugoBlox page-builder block.
title:
date: 2026-01-01
type: landing

sections:
  - block: hero
    content:
      tagline: Alternative splicing · Gene regulation
      title: Decoding alternative _isoforms_ in cancer.
      image:
        filename: hero-loop.gif
      text: |
        We use high-throughput functional genomics to understand how aberrant RNA
        processing and gene regulation drive oncogenic cell states.
      cta:
        url: ./research/
        label: Explore our research
      cta_alt:
        url: ./contact/
        label: Join us

  - block: feature
    content:
      title: What we study
      subtitle: Welcome · 01
      figure: isoform
      caption: Fig. 1 — a cassette exon is kept (isoform A) or skipped (isoform B), yielding two proteins with different domains and DNA-binding specificity.
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
      subtitle: Location · 02
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
      subtitle: News · 03
      count: 4
      filters:
        folders:
          - post
      order: desc
    design:
      view: news
      columns: '1'

  - block: collection
    content:
      title: Selected publications
      subtitle: Publications · 04
      count: 3
      filters:
        folders:
          - publication
        featured_only: true
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
