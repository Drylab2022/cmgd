import {FieldCheckerV3MultiValue} from "./FieldCheckerV3MultiValue";

let fields=[];

fields.push(new FieldCheckerV3MultiValue("sampleID",true,"[a-zA-Z]\\S+",false));
fields.push(new FieldCheckerV3MultiValue("subjectID",true,"[a-zA-Z]\\S+",false));
fields.push(new FieldCheckerV3MultiValue("body_site",true,"stool|skin|vagina|oralcavity|nasalcavity|lung|milk",false));
fields.push(new FieldCheckerV3MultiValue("body_subsite",false,"anterior_nares|hard_palate|keratinized_gingiva|l_retroauricular_crease|r_retroauricular_crease|mid_vagina|palatine_tonsils|saliva|stool|supragingival_plaque|subgingival_plaque|throat|vaginal_introitus|posterior_fornix|tongue_dorsum|sputum|buccal_mucosa|left_elbow|right_ear|left_ear|right_elbow|rectal_swab|chest",false));
fields.push(new FieldCheckerV3MultiValue("antibiotics_current_use",false,"yes|no",false));
fields.push(new FieldCheckerV3MultiValue("antibiotics_family",false,"dopamine_antagonists|phenylpiperidines|thienobenzodiazepines|blood_pressure_medication|diabetes_oral_medication|anti_retrovirals|beta_blockers|reverse_transcriptase_inhibitors|anti_virals|cephalosporins|penicillins|macrolides|beta_lactamase_inhibitors|nitrofurans|sulphonamides|aminoglycosides|carbapenems|fluoroquinolones|laxatives|none",true));
fields.push(new FieldCheckerV3MultiValue("study_condition",false,"ACVD|acute_diarrhoea|cellulitis|melanoma|gangrene|osteoarthritis|control|NK|pyelonefritis|salmonellosis|sepsis|skininf|suspinf|arthritis|STEC|CRC|adenoma|fatty_liver|hypertension|pre-hypertension|coeliac|asthma|gestational_diabetes|cirrhosis|HBV|HDV|HEV|CMV|CDI|IBD|T2D|T1D|AD|AR|IGT|schizophrenia|ascites|wilson|otitis|bronchitis|pneumonia|respiratoryinf|cough|stomatitis|fever|pyelonephritis|infectiousgastroenteritis|tonsillitis|cystitis|abdominalhernia|psoriasis|cephalosporins|AS|RA|metabolic_syndrome|FMT|premature_born|periodontitis|SRP|STH|BD|chorioamnionitis|pre-eclampsia|carcinoma_surgery_history",false));
fields.push(new FieldCheckerV3MultiValue("disease",false,"healthy|acute_diarrhoea|hepatitis|ACVD|NK|CRC|STEC|melanoma|adenoma|arthritis|cellulitis|gangrene|osteoarthritis|NK|pyelonefritis|salmonellosis|sepsis|skininf|suspinf|fatty_liver|hypertension|coeliac|asthma|gestational_diabetes|cirrhosis|HBV|HDV|HEV|CMV|CDI|IBD|T2D|T1D|AD|AR|IGT|BD|schizophrenia|ascites|wilson|otitis|bronchitis|pneumonia|respiratoryinf|cough|stomatitis|fever|pyelonephritis|infectiousgastroenteritis|tonsillitis|cystitis|abdominalhernia|psoriasis|RA|metabolic_syndrome|metastases|hypercholesterolemia|periodontitis|ascaris_lumbricoides|necator_americanus|trichuris_trichiura|chorioamnionitis|pre-eclampsia",true));
fields.push(new FieldCheckerV3MultiValue("disease_subtype",false,"healthy|CD|UC|adenoma|smalladenoma|largeadenoma|advancedadenoma|adenocarcinoma|carcinoma|AS|cholera|T1D_nonconverter|T1D_seroconverter|NAFLD|Ulcerative_colitis|Indeterminate_colitis",false));
fields.push(new FieldCheckerV3MultiValue("age",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("infant_age",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("age_category",false,"newborn|child|schoolage|adult|senior",false));
fields.push(new FieldCheckerV3MultiValue("gender",false,"female|male|other",false));
fields.push(new FieldCheckerV3MultiValue("visit_number",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("BMI",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("country",true,"LBR|SLV|CAN|DNK|EST|FJI|FIN|FRA|DEU|ITA|MNG|NLD|NOR|ESP|PHL|SWE|USA|GBR|CHN|RUS|LUX|AUT|TZA|PER|MDG|ISL|BRN|IDN|MYS|HUN|SVK|SGP|ISR|BGD|KAZ|IND|GHA|ETH|JPN|CMR",false));
fields.push(new FieldCheckerV3MultiValue("location",false,".+",false));
fields.push(new FieldCheckerV3MultiValue("population",false,"[a-zA-Z]\\S+",false));
fields.push(new FieldCheckerV3MultiValue("travel_destination",false,"CMR|ETH|KEN|TZA|RWA|IND|LKA|NPL",false));
fields.push(new FieldCheckerV3MultiValue("non_westernized",false,"yes|no",false));
fields.push(new FieldCheckerV3MultiValue("lifestyle",false,"Hunter-gatherer|Agriculturalist|Fisher",false));
fields.push(new FieldCheckerV3MultiValue("days_from_first_collection",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("sequencing_platform",true,"IlluminaHiSeq|IlluminaMiSeq|IlluminaNextSeq",false));
fields.push(new FieldCheckerV3MultiValue("DNA_extraction_kit",false,"Qiagen|Gnome|MoBio|MPBio|NorgenBiotek|Illuminakit|Maxwell_LEV|PSP_Spin_Stool|Tiangen|PowerSoil|other|PowerSoilPro",false));
fields.push(new FieldCheckerV3MultiValue("PMID",true,"[0-9]{8}|unpublished",false));
fields.push(new FieldCheckerV3MultiValue("number_reads",true,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("number_bases",true,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("minimum_read_length",true,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("median_read_length",true,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("NCBI_accession",false,"[ES]R[SR][0-9]+",true));
fields.push(new FieldCheckerV3MultiValue("pregnant",false,"yes|no",false));
fields.push(new FieldCheckerV3MultiValue("lactating",false,"yes|no",false));
fields.push(new FieldCheckerV3MultiValue("birth_control_pil",false,"yes|no",false));
fields.push(new FieldCheckerV3MultiValue("smoker",false,"yes|no",false));
fields.push(new FieldCheckerV3MultiValue("ever_smoker",false,"yes|no",false));
fields.push(new FieldCheckerV3MultiValue("alcohol",false,"yes|no",false));
fields.push(new FieldCheckerV3MultiValue("mumps",false,"yes|no",false));
fields.push(new FieldCheckerV3MultiValue("ajcc",false,"0|i|ii|iii|iv",false));
fields.push(new FieldCheckerV3MultiValue("fobt",false,"yes|no",false));
fields.push(new FieldCheckerV3MultiValue("tnm",false,"t4n1m1|t3nxm1|t2n0m1|tnm|t2n1m1|t4n2m1|t3n0m1|t3n2m0|t4n0m1|t4n1m0|no|t4n0m0|t3n0m0|t3n1m0|ptis|t1n0m0|t4n2m0|t3n1m1|t3n2m1|tisn0m0|t2n0m0|t1n0m1|t2n1m0|t2m0n0|t2n2m0",false));
fields.push(new FieldCheckerV3MultiValue("days_after_onset",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("stec_count",false,"high|low|moderate",false));
fields.push(new FieldCheckerV3MultiValue("shigatoxin_2_elisa",false,"positive|negative",false));
fields.push(new FieldCheckerV3MultiValue("stool_texture",false,"smooth|watery|bloody",false));
fields.push(new FieldCheckerV3MultiValue("insulin_cat",false,"yes|no",false));
fields.push(new FieldCheckerV3MultiValue("inr",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("protein_intake",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("flg_genotype",false,"wt|s1515x|e2422x|e2422x/3321dela",false));
fields.push(new FieldCheckerV3MultiValue("momeducat",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("hitchip_probe_class",false,"lpc|hpc",false));
fields.push(new FieldCheckerV3MultiValue("hitchip_probe_number",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("mgs_richness",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("hla_drb12",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("hla_dqa12",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("hla_dqa11",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("hla_drb11",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("hla_dbq12",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("hla_dbq11",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("ctp",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("start_solidfood",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("triglycerides",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("cholesterol",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("hdl",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("ldl",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("adiponectin",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("fasting_insulin",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("hba1c",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("c_peptide",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("glp_1",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("cd163",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("il_1",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("leptin",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("glucose",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("fgf_19",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("glutamate_decarboxylase_2_antibody",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("creatinine",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("creatine",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("albumine",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("bilubirin",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("prothrombin_time",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("dyastolic_p",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("systolic_p",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("hscrp",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("ferm_milk_prod_consumer",false,"dfmp",false));
fields.push(new FieldCheckerV3MultiValue("family",false,".+",false));
fields.push(new FieldCheckerV3MultiValue("family_role",false,"child|mother|father",false));
fields.push(new FieldCheckerV3MultiValue("born_method",false,"c_section|vaginal",false));
fields.push(new FieldCheckerV3MultiValue("premature",false,"yes|no",false));
fields.push(new FieldCheckerV3MultiValue("birth_order",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("age_twins_started_to_live_apart",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("feeding_practice",false,"exclusively_breastfeeding|no_breastfeeding||mixed_feeding|any_breastfeeding|exclusively_formula_feeding",false));
fields.push(new FieldCheckerV3MultiValue("breastfeeding_duration",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("formula_first_day",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("ESR",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("HLA",false,".+",true));
fields.push(new FieldCheckerV3MultiValue("autoantibody_positive",false,".+",true));
fields.push(new FieldCheckerV3MultiValue("age_seroconversion",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("age_T1D_diagnosis",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("disease_stage",false,"[0-9]+",false));
fields.push(new FieldCheckerV3MultiValue("disease_location",false,".+",true));
fields.push(new FieldCheckerV3MultiValue("calprotectin",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("treatment",false,"no|EEN|5-ASA|aza|modulen_suppl|iron|folate|forceval|methotrexate|Lactulose|probiotic|NSAID|anthelmintics|albendazole",true));
fields.push(new FieldCheckerV3MultiValue("remission",false,"no|yes",false));
fields.push(new FieldCheckerV3MultiValue("wbc",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("rbc",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("blood_platelet",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("hemoglobinometry",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("ast",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("alt",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("globulin",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("urea_nitrogen",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("ASO",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("anti_ccp_antibody",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("rheumatoid_factor",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("dental_sample_type",false,"teeth",false));
fields.push(new FieldCheckerV3MultiValue("zigosity",false,"monozygotic|dizygotic",false));
fields.push(new FieldCheckerV3MultiValue("menopausal_status",false,"pre|going_through|post",false));
fields.push(new FieldCheckerV3MultiValue("BASDAI",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("BASFI",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("HBI",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("SCCAI",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("birth_weight",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("gestational_age",false,"[0-9]+\\.?[0-9]*",false));
fields.push(new FieldCheckerV3MultiValue("diet",false,"omnivore|vegan|vegetarian",false));
fields.push(new FieldCheckerV3MultiValue("curator",true,"Paolo_Manghi|Valentina_Giunchiglia|Pamela_Ferretti|Marisa_Metzger|Giacomo_DAmato|Jacob_Wirbel|Arianna_Bonetti|Anna_Pedrotti|Francesca_DeFilippis",true));
fields.push(new FieldCheckerV3MultiValue("uncurated_metadata",false,".+",false));

export function check(json:object):void{
    for (let index:number;index<fields.length;index++)
    {
        const field=fields[index];
        field.check(json);
    }
}
