import React from "react";
import LoaderCss from "../../../../assets/styles/Loader.module.css";

export default function Loader() {
    return (
        <div className={LoaderCss['dot-spinner']}>
        <div className={LoaderCss['dot-spinner__dot']}></div>
        <div className={LoaderCss['dot-spinner__dot']}></div>
        <div className={LoaderCss['dot-spinner__dot']}></div>
        <div className={LoaderCss['dot-spinner__dot']}></div>
        <div className={LoaderCss['dot-spinner__dot']}></div>
        <div className={LoaderCss['dot-spinner__dot']}></div>
        <div className={LoaderCss['dot-spinner__dot']}></div>
        <div className={LoaderCss['dot-spinner__dot']}></div>
    </div>
    )
}