export const contentBlog1 = `
## Micro Influencers dalam Digital Marketing
Dalam dunia digital marketing, influencer marketing telah menjadi strategi yang populer untuk meningkatkan brand awareness dan engagement. Namun, tidak semua influencer memiliki jangkauan dan dampak yang sama. Salah satu kategori yang semakin populer adalah micro influencers. Artikel ini akan membahas apa itu micro influencers, perbedaannya dengan jenis influencer lainnya, serta kelebihan dan kekurangannya.


### Apa Itu Micro Influencers?
Micro influencers adalah individu yang memiliki jumlah pengikut di media sosial yang relatif kecil, biasanya antara 1.000 hingga 100.000 pengikut. Meskipun jumlah pengikut mereka tidak sebesar mega atau macro influencers, micro influencers sering kali memiliki hubungan yang lebih erat dan autentik dengan audiens mereka. Hal ini membuat mereka lebih dipercaya dan berpengaruh dalam mempengaruhi keputusan pembelian.

### Perbedaan Micro Influencers dengan Jenis Influencers Lainnya


#### 1. Mega Influencers
Mega influencers adalah individu yang memiliki lebih dari 1 juta pengikut di media sosial. Mereka sering kali merupakan selebriti, tokoh publik, atau individu terkenal lainnya yang memiliki pengaruh besar di berbagai platform. Kelebihan dari mega influencers adalah jangkauan yang luas, namun engagement rate mereka cenderung lebih rendah dibandingkan dengan micro influencers.


#### 2. Macro Influencers
Macro influencers memiliki jumlah pengikut antara 100.000 hingga 1 juta. Mereka biasanya adalah individu yang terkenal di niche tertentu atau memiliki keahlian khusus yang menarik banyak pengikut. Macro influencers memiliki jangkauan yang lebih luas daripada micro influencers, namun biaya untuk bekerja sama dengan mereka juga lebih tinggi.


#### 3. Nano Influencers
Nano influencers adalah individu dengan pengikut di bawah 1.000 orang. Mereka sering kali adalah orang biasa yang memiliki pengaruh kuat di lingkaran pertemanan atau komunitas mereka. Meskipun jangkauan mereka sangat terbatas, nano influencers memiliki tingkat kepercayaan dan engagement yang sangat tinggi.

`;

export const latestBlog1 = `
### Latest Blog

UGC: Apa Itu dan Pentingnya dalam Strategi Marketing

TikTok Ads: Pengertian, Jenis, Cara Kerja, dan Tips Beriklan Efektif

OOH: Strategi Pemasaran Offline, Apa Tetap Efektif di Era Digital?

`;

export const newContent = `
<h3><span style="font-size: 1.125em"><strong>Menghindari Perhitungan Engagement pada Campaign dengan Interest Tertentu Menggunakan SQL</strong></span></h3><p></p><p></p><p><span style="font-size: 0.75em">Dalam analisis data influencer, terkadang kita perlu mengecualikan beberapa campaign berdasarkan kriteria tertentu, seperti interest ID. Misalnya, jika Anda memiliki interest ID “207” yang tidak relevan, Anda ingin memastikan bahwa campaign dengan ID tersebut tidak memengaruhi hasil perhitungan engagement. Dalam artikel ini, kita akan membahas bagaimana cara mengimplementasikan kondisi ini menggunakan query SQL secara efisien.</span></p><p></p><img src="http://res.cloudinary.com/dlvyzfhj2/image/upload/v1733472838/image_18_p2w7av.png" style="width: 615px; height: auto; cursor: pointer; margin: 0px auto;" draggable="true"><p style="text-align: center"><strong><em>Figure. 1. </em></strong>picture of peaple.</p><p style="text-align: center"></p><pre><code>WITH influencer_data AS (
  SELECT
    i.full_name AS fullname,
    b.branch_name AS branchName,
    COUNT(DISTINCT subQuery.id) AS totalPost,
    COUNT(DISTINCT subQuery.campaign_id) AS totalCampaign,
    COALESCE(SUM(DISTINCT usm.total_follower), 0) AS totalFollower,
    COALESCE(SUM(DISTINCT subQuery.total_engagementCount), 0) AS totalEngagement,
    CASE
      WHEN SUM(DISTINCT usm.total_follower) &gt;= 5000 THEN 'Macro'
      ELSE 'Micro'
    END AS influencerType
  FROM influencer i
  JOIN (
    SELECT
      p.id,
      p.user_id,
      p.campaign_id,
      p.created_dt,
      SUM(
        (COALESCE(p.like_count, 0) * COALESCE(cf_like.value, 1)) +
        (COALESCE(p.comment_count, 0) * COALESCE(cf_comment.value, 1)) +
        (COALESCE(p.share_count, 0) * COALESCE(cf_share.value, 1)) +
        (COALESCE(p.views_count, 0) * COALESCE(cf_view.value, 1)) +
        (COALESCE(p.play_count, 0) * COALESCE(cf_play.value, 1))
      ) AS total_engagementCount
    FROM post_influencer p
    LEFT JOIN campaign_formula cf_like ON cf_like.campaign_id = p.campaign_id AND cf_like.matric = 'like'
    LEFT JOIN campaign_formula cf_comment ON cf_comment.campaign_id = p.campaign_id AND cf_comment.matric = 'comment'
    LEFT JOIN campaign_formula cf_share ON cf_share.campaign_id = p.campaign_id AND cf_share.matric = 'share'
    LEFT JOIN campaign_formula cf_view ON cf_view.campaign_id = p.campaign_id AND cf_view.matric = 'view'
    LEFT JOIN campaign_formula cf_play ON cf_play.campaign_id = p.campaign_id AND cf_play.matric = 'play'
    LEFT JOIN campaign_interest ci ON ci.assessment_id = p.campaign_id
    WHERE
      p.deleted_dt IS NULL
      AND NOT EXISTS (
        SELECT 1
        FROM campaign_interest ci2
        WHERE ci2.assessment_id = p.campaign_id
          AND ci2.interest_id = 207
      )
    GROUP BY p.id
  ) AS subQuery ON subQuery.user_id = i.user_id
  LEFT JOIN user u ON u.user_id = i.user_id
  LEFT JOIN campaign c ON c.id = subQuery.campaign_id AND c.deleted_dt IS NULL
  LEFT JOIN user_company uc ON uc.user_id = i.user_id
  LEFT JOIN branch b ON b.id = uc.branch_id
  LEFT JOIN user_sosial_media usm ON usm.user_id = i.user_id
  WHERE</code></pre>
`;
