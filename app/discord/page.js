"use client";

import { Button } from "@nextui-org/button";
import React, { useState, useEffect } from "react";

export default function aPage() {
  // useEffect(async () => {
  // fetch("/api/hello")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
  // }, []);

  const fetchTodos = async () => {
    const response = await fetch("/api/todos");
    const data = await response.json();
    settodos(data);
  };

  const deleteMsg = () => {
    let data = [
      {
        ID: "896776993264267274",
        Timestamp: "2021-10-10 15:11:36",
        Contents:
          "SSP shop at GtMiniStore\nSSP shop at GtMiniStore\nSSP shop at GtMiniStore",
        Attachments: "",
      },
      {
        ID: "896675946155884574",
        Timestamp: "2021-10-10 08:30:04",
        Contents:
          "Cheap SSP shop at GtMiniStore\n\nAlso buy SSP pack 200/11 (dm me)",
        Attachments: "",
      },
      {
        ID: "896657606037356546",
        Timestamp: "2021-10-10 07:17:12",
        Contents:
          "Cheap SSP shop at GtMiniStore\n\nAlso buy SSP pack 200/11 (dm me)",
        Attachments: "",
      },
      {
        ID: "896588438416011295",
        Timestamp: "2021-10-10 02:42:21",
        Contents:
          "Cheap SSP shop at GtMiniStore\n\nAlso buy SSP pack 200/11 (dm me)",
        Attachments: "",
      },
      {
        ID: "896584467760681023",
        Timestamp: "2021-10-10 02:26:34",
        Contents:
          "Cheap SSP shop at GtMiniStore\n\nAlso buy SSP pack 200/11 (dm me)",
        Attachments: "",
      },
      {
        ID: "896577668965859378",
        Timestamp: "2021-10-10 01:59:33",
        Contents:
          "Cheap SSP shop at GtMiniStore\n\nAlso buy SSP pack 200/11 (dm me)",
        Attachments: "",
      },
      {
        ID: "896384021238546463",
        Timestamp: "2021-10-09 13:10:04",
        Contents:
          "Cheap SSP shop at GtMiniStore\n\nAlso buy SSP pack 200/11 (dm me)",
        Attachments: "",
      },
      {
        ID: "896379773931118612",
        Timestamp: "2021-10-09 12:53:12",
        Contents:
          "Cheap SSP shop at GtMiniStore\n\nAlso buy SSP pack 200/11 (dm me)",
        Attachments: "",
      },
      {
        ID: "896376189642489877",
        Timestamp: "2021-10-09 12:38:57",
        Contents:
          "Cheap SSP shop at GtMiniStore\n\nAlso buy SSP pack 200/11 (dm me)",
        Attachments: "",
      },
      {
        ID: "896323924374216744",
        Timestamp: "2021-10-09 09:11:16",
        Contents:
          "Cheap SSP shop at GtMiniStore\n\nAlso buy SSP pack 200/11 (dm me)",
        Attachments: "",
      },
      {
        ID: "896305823284883477",
        Timestamp: "2021-10-09 07:59:20",
        Contents:
          "Cheap SSP shop at GtMiniStore\n\nAlso buy SSP pack 200/11 (dm me)",
        Attachments: "",
      },
      {
        ID: "896295736453505034",
        Timestamp: "2021-10-09 07:19:15",
        Contents:
          "Cheap SSP shop at GtMiniStore\n\nAlso buy SSP pack 200/11 (dm me)",
        Attachments: "",
      },
      {
        ID: "896256271177646101",
        Timestamp: "2021-10-09 04:42:26",
        Contents:
          "Cheap SSP shop at GtMiniStore\n\nAlso buy SSP pack 200/11 (dm me)",
        Attachments: "",
      },
      {
        ID: "896238443640786965",
        Timestamp: "2021-10-09 03:31:36",
        Contents:
          "Cheap SSP at GtMiniStore\n\nAlso buy SSP pack 200/11 (dm me)",
        Attachments: "",
      },
      {
        ID: "896231364075073586",
        Timestamp: "2021-10-09 03:03:28",
        Contents:
          "Cheap SSP at GtMiniStore\n\nAlso buy SSP pack 200/11 (dm me)",
        Attachments: "",
      },
      {
        ID: "895995204027449354",
        Timestamp: "2021-10-08 11:25:03",
        Contents:
          "Cheap SSP shop at GtMiniStore\n\nAlso buy ssp pack 200/11 (dm me)",
        Attachments: "",
      },
      {
        ID: "895883308754432000",
        Timestamp: "2021-10-08 04:00:25",
        Contents:
          "Cheap ssp at GtMiniStore\n\nAlso buy ssp pack 200/11 (DM me)",
        Attachments: "",
      },
      {
        ID: "895861993226006568",
        Timestamp: "2021-10-08 02:35:43",
        Contents:
          "Cheap ssp at GtMiniStore\n\nAlso buy ssp pack 200/11 (DM me)",
        Attachments: "",
      },
      {
        ID: "895851882554224750",
        Timestamp: "2021-10-08 01:55:32",
        Contents:
          "Cheap SSP at GtMiniStore\n\nAlso buy ssp pack 200/11 (dm me)",
        Attachments: "",
      },
    ];

    // fetch(`https://discord.com/api/v9/channels/895690960586031104/messages/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     'Authorization': "NDQwMDk0MTIzMTE0ODg5MjE2.GgEai1.5t0CqF07xy-GSQUhE-TaebvePEz1qMJLAdhhAs",
    //     'cookie': "__dcfduid=19a73ce03a0611efad29d5bb3e8f8657; __sdcfduid=19a73ce13a0611efad29d5bb3e8f86573d331fdcf9ecbd1137adaa06e9e2d179a4bd2146c275fc811b8704345655b848; _ga=GA1.1.1015897121.1727450635; _ga_YL03HBJY7E=GS1.1.1727450634.1.1.1727450681.0.0.0; _cfuvid=E8twBwgrIgHiY0ORPKNTu4xx44L9mnMIbCpPd5dzTMI-1731381036803-0.0.1.1-604800000; __cfruid=b4383c332e8bfc2b1e8ebf6f7ca24e595fadb5b9-1731381696; locale=en-US; OptanonConsent=isIABGlobal=false&datestamp=Tue+Nov+12+2024+10%3A21%3A37+GMT%2B0700+(Indochina+Time)&version=6.33.0&hosts=&landingPath=https%3A%2F%2Fdiscord.com%2F&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1; cf_clearance=V.ilTXFzSdpcJpxcHjPJiN4ibqYeSmj9JVFswfa7wb8-1731381697-1.2.1.1-iKpVT4gVT_f8nQd1jaKh7C1NYSm9GUXkgaxaDeFg5GU1wjuHdLEj4mNFl_ilu9.pPU60rVma.eGe0XUOgkLlQ2RiqECPUOeo6UYuSHOnybuA8XembDKFMlTB_FsDYN06.HlmFpZ1WtEixFfkcSqFQnEt7OF8vkrYuJFrDLooVr1VTkAa5TpzqVGHqsQXJwytup9SweAwnBwqopl5Hnx3a9SYF1a56xdOTYo.zOej.om6dlgP_jb2ZSZc9gw_nyQLiMboMBi5rq4QLvWFnM_d1w2svu4NGmkZ2zmo9POg1La.d1xEtbFaaL7C2i53POrvH219WzqCPlLGdz626TkcUTH1maExeNEZQ7TTsrChdOxqDQQkevFG71Lxae40Nl8mpXaUCe0IaK7rAiU1MFszDg"
    // }
    // })
    //   .then(response => response.json())
  };

  return (
    <div>
      <Button onClick={fetchTodos}>Delete Discord Message!!!</Button>
    </div>
  );
}
