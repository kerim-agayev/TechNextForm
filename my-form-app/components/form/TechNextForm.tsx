"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStudentAsync, getAllMajoritiesAsync } from "../../redux/slice/StudentService";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "../ui/form"; //? shadcn ui
import { Input } from "../ui/input";
import AiButton from "../MagicButton";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { message, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState, useEffect } from "react";


export const courses = [
  "Frontend Development",
  "Backend Development",
  "Full Stack (MERN) Development",
  "Flutter Development",
  "Mobile App Development",
  "JavaScript Mastery",
  "DevOps Engineering",
  "Data Science",
  "AI & Machine Learning",
  "Cybersecurity",
];
export const universities = [
  "Azərbaycan Dövlət İqtisad Universiteti",
  "Bakı Dövlət Universiteti",
  "Azərbaycan Texniki Universiteti",
  "Azərbaycan Dillər Universiteti",
  "Azərbaycan Tibb Universiteti",
  "Xəzər Universiteti",
  "Bakı Ali Neft Məktəbi",
  "ADA Universiteti",
  "Azərbaycan Dövlət Neft və Sənaye Universiteti",
  "Bakı Slavyan Universiteti",
  "Qafqaz Universiteti",
  "Naxçıvan Dövlət Universiteti",
  "Gəncə Dövlət Universiteti",
  "Azərbaycan Memarlıq və İnşaat Universiteti",
  "Azərbaycan Pedaqoji Universiteti",
  "Azərbaycan Dövlət Mədəniyyət və İncəsənət Universiteti",
  "Azərbaycan Dövlət Bədən Tərbiyəsi və İdman Akademiyası",
  "Sumqayıt Dövlət Universiteti",
  "Azərbaycan Dövlət Rəssamlıq Akademiyası",
  "Azərbaycan Dövlət Aqrar Universiteti",
  "Azərbaycan Texnologiya Universiteti",
  "Lənkəran Dövlət Universiteti",
  "Azərbaycan Turizm və Menecment Universiteti",
  "Mingəçevir Dövlət Universiteti",
];
export const genders = ["Male", "Female", "Other"];

export const formSchema = z.object({
  FirstName: z.string().min(2, { message: "Ad ən az 2 simvol olmalıdır." }),
  LastName: z.string().min(2, { message: "Soyadı ən az 2 simvol olmalıdır." }),
 FatherName: z.string().min(2, { message: "Ad ən az 2 simvol olmalıdır." }),
 FinCode: z.string().min(7, { message: "FinCode ən az 7 simvol olmalıdır." }),
  BirthDate: z.string().refine(
    (val) => {
      const date = new Date(val);
      const age = new Date().getFullYear() - date.getFullYear();
      return age >= 8 && age <= 100;
    },
    { message: "Uyğun bir yaş aralığı seçın (8-100)" }
  ),
  Gender: z.enum(["male", "female", "other"], {
    required_error: "Cinsiyyət seçilməlidir",
  }),
  Email: z.string().email({ message: "Uyğun bir e-mail adresi daxil edin." }),
  PhoneNumber: z
    .string()
    .regex(
      /^(?:\+994|994)?(?:\s?)(51|50|55|70|77|60)(?:\s?\d{3})(?:\s?\d{2})(?:\s?\d{2})$/,
      {
        message:
          "Uygun bir telefon nömrəsi daxil edin (məs: +994 51 811 81 21).",
      }
    ),

  Address: z.string().min(3, { message: "Ünvan ən az 5 simvol olmalıdır." }),
  University: z.string().min(1, { message: "Universitet seçilməlidir." }),
  MotivationLetter: z
    .string()
    .min(10, { message: "Motivasiya məktubu ən az 10 simvol olmalıdır." }),
    ProgrammingKnowledge: z.string().min(3, {
    message: "Programlaşdırma dili haqqında məlumat ən az 3 simvol olmalıdır.",
  }),
  MajorityId: z.string().min(1, { message: "İxtisas seçilməlidir." }),//? majorityId
  //? cv
  CvUrl: z.instanceof(File, { message: "Zəhmət olmasa bir CV yükləyin." }),
});
const TechNextForm = () => {
 
  const [showButton, setshowButton] = useState(false)
  //? navigation
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FirstName: "", //?
      LastName: "", //?
      FatherName:"", //?
      BirthDate: "", //?
      FinCode:"", //?
      Email: "", //?
      PhoneNumber: "", //?
      Address: "", //?
      University: "",//?
      MotivationLetter: "", //?
      ProgrammingKnowledge: "",//?
      MajorityId: "",  //?
    },
  });
  //? redux toolkit

  const dispatch = useAppDispatch();
  useEffect(() => {
    // Dispatch the action to fetch majorities
    dispatch(getAllMajoritiesAsync())
      .unwrap() // unwrap to handle errors
      .catch((error) => {

        message.error(`Error fetching majorities: ${error}`);
      });
  }, [dispatch]);

  const { error: backError, isLoading, majorities, isMajoritiesLoading, isMajoritiesError } = useAppSelector(
    (state) => state.students
  );

  async function onSubmitForm(values: z.infer<typeof formSchema>) {
    try {
      const result = await dispatch(createStudentAsync(values)).unwrap();
      if (result) {
        router.push("/success");
      }
    } catch (error) {
      message.error(error as string);
    }
  }
  
//? rectaptcha
const { executeRecaptcha } = useGoogleReCaptcha();
const handleRecaptchaSubmit = async( ) => {

  if(!executeRecaptcha){
    console.log(`recaptcha yoxdur`)
    return;
   
  }

  const token  = await executeRecaptcha("form_submit")
  console.log(`token:${token}`)
  //? send to token your server

  const response = await fetch('/api/verify-recaptcha',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({token})
  })
  const data = await response.json()
  console.log(`data:${JSON.stringify(data)}`)
  if (data.success) {

   console.log(`recaptcha verification success:${data}`)
  }else{
    message.error("recapctha verification error")
  }

}
  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md my-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitForm)} >
  
            <FormField
              control={form.control}
              name="FirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2">
                    Adınız*
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border rounded p-3 w-full"
                      placeholder="Ad"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="LastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2">
                    Soyadınız*
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border rounded p-3 w-full"
                      placeholder="Soyad"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="FatherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2">
                    Ata adı*
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border rounded p-3 w-full"
                      placeholder="Soyad"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
 <FormField
              control={form.control}
              name="FinCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2">
                    Fin Kod*
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border rounded p-3 w-full"
                      placeholder="Soyad"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="BirthDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2">
                    Doğum Tarixi*
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border rounded p-3 w-full"
                      type="date"
                      placeholder="Doğum Tarixi"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2">
                    Cinsiyyət*
                  </FormLabel>
                  <FormControl>
                    <select {...field} className="border rounded p-3 w-full">
                      <option value="">Seçin</option>
                      <option value="male">Kişi</option>
                      <option value="female">Qadın</option>
                      <option value="other">Digər</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2">
                    E-mail*
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border rounded p-3 w-full"
                      placeholder="E-mail"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="PhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2">
                    Telefon Nömrəsi*
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border rounded p-3 w-full"
                      placeholder="+994 51 811 81 21"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2">
                    Ünvan*
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border rounded p-3 w-full"
                      placeholder="Ünvan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="University"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2">
                    Universitet*
                  </FormLabel>
                  <FormControl>
                    <select {...field} className="border rounded p-3 w-full">
                      <option value="">Seçin</option>
                      {universities.map((uni) => (
                        <option key={uni} value={uni}>
                          {uni}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="MajorityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2">
                    İxtisas Seçimi*
                  </FormLabel>
                  <FormControl>
                    <select {...field} className="border rounded p-3 w-full">
                      <option value="">Seçin</option>
                      {majorities.map((majority) => (
                        <option key={majority.id} value={majority.id}>
                          {majority.MajorityName}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="MotivationLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2">
                    Motivasiya Məktubu*
                  </FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Motivasiya Məktubu"
                      className="border rounded p-3 w-full"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ProgrammingKnowledge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2">
                    Proqramlaşdırma Bilgisi*
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border rounded p-3 w-full"
                      placeholder="Programlaşdırma Bilgisi"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* //? cv */}
            
            <FormField
              control={form.control}
              name="CvUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium mb-2">
                    CV Yükleyin*
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.PNG"
                      className="border rounded p-3 w-full"
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <button type="submit" className="bg-blue-500 text-white p-3 rounded mt-4 w-full">Göndər</button> */}
            <div className="flex justify-center items-center">
              {isLoading ? <Spin size="large" /> : <AiButton />}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default TechNextForm;










