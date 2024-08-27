"use client"
 
import { z } from "zod"
import { useForm,  } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createStudentAsync } from "../../redux/slice/StudentService";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl, FormDescription} from "../ui/form"//? shadcn ui
import { Input } from "../ui/input"
import AiButton from "../MagicButton"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { message, Spin } from "antd";
import { useRouter } from "next/navigation";

const courses = [
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
const universities = [
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

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Ad ən az 2 simvol olmalıdır." }),
  lastName: z.string().min(2, { message: "Soyadı ən az 2 simvol olmalıdır." }),
  dob: z.string().refine((val) => {
    const date = new Date(val);
    const age = new Date().getFullYear() - date.getFullYear();
    return age >= 8 && age <= 100;
  }, { message: "Uyğun bir yaş aralığı seçın (16-100)" }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Cinsiyyət seçilməlidir",
  }),
  email: z.string().email({ message: "Uyğun bir e-mail adresi daxil edin." }),
  phone: z
  .string()
  .regex(/^(?:\+994|994)?(?:\s?)(51|50|55|70|77|60)(?:\s?\d{3})(?:\s?\d{2})(?:\s?\d{2})$/
, {
    message: "Uygun bir telefon nömrəsi daxil edin (məs: +994 51 811 81 21).",
  }),

  address: z.string().min(5, { message: "Ünvan ən az 5 simvol olmalıdır." }),
  school: z.string().min(2, { message: "Məktəb adı ən az 2 simvol olmalıdır." }),
  university: z.string().min(1, { message: "Universitet seçilməlidir." }),
  motivation: z
    .string()
    .min(10, { message: "Motivasiya məktubu ən az 10 simvol olmalıdır." }),
  programmingKnowledge: z
    .string()
    .min(3, { message: "Programlaşdırma dili haqqında məlumat ən az 3 simvol olmalıdır." }),
 // github: z.string().url({ message: "Uyğun bir URL daxil edin." }).optional(),
 github: z.union([z.string().url({ message: "Uyğun bir URL daxil edin." }).optional(), z.undefined(), z.null(), ]),

  course: z.string().min(1, { message: "İxtisas seçilməlidir." }),
})
const TechNextForm = () => {
   //? navigation
   const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      phone: '',
      address: '',
      school: '',
      university: '',
      motivation: '',
      programmingKnowledge: '',
      github: '',
      course: '',
    },
    
  })
  //? redux toolkit

  const dispatch = useAppDispatch();

  const{error:backError, isLoading} = useAppSelector((state) => state.students);
 
  async function onSubmitForm(values: z.infer<typeof formSchema>) {
    const formattedData = {
      ...values,
      dob: new Date(values.dob), //
    };
    console.log(values)
    try {
      await dispatch(createStudentAsync(formattedData)).unwrap();
      message.success('Qeydiyyat uğurla tamamlandı');
      router.push('/success');
    } catch (error) {
        message.error(error as string, 6);
      
    } finally {
      form.reset(); // Formu her durumda sıfırla
    }
  }
  

  return (
<>
<div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)}>
          <FormField control={form.control} name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium mb-2">Adınız*</FormLabel>
                <FormControl >
                  <Input className="border rounded p-3 w-full" placeholder="Ad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField control={form.control} name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium mb-2">Soyadınız*</FormLabel>
                <FormControl>
                  <Input className="border rounded p-3 w-full" placeholder="Soyad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField control={form.control} name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium mb-2">Doğum Tarixi*</FormLabel>
                <FormControl>
                  <Input  className="border rounded p-3 w-full" type="date" placeholder="Doğum Tarixi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField control={form.control} name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium mb-2">Cinsiyyət*</FormLabel>
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

          <FormField control={form.control} name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium mb-2">E-mail*</FormLabel>
                <FormControl>
                  <Input className="border rounded p-3 w-full" placeholder="E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField control={form.control} name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium mb-2">Telefon Nömrəsi*</FormLabel>
                <FormControl>
                  <Input className="border rounded p-3 w-full" placeholder="+994 51 811 81 21" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField control={form.control} name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium mb-2">Ünvan*</FormLabel>
                <FormControl>
                  <Input className="border rounded p-3 w-full" placeholder="Ünvan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField control={form.control} name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium mb-2">Məktəb Adı*</FormLabel>
                <FormControl>
                  <Input className="border rounded p-3 w-full" placeholder="Məktəb" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField control={form.control} name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium mb-2">Universitet*</FormLabel>
                <FormControl>
                  <select {...field} className="border rounded p-3 w-full">
                    <option value="">Seçin</option>
                    {universities.map((uni) => (
                      <option key={uni} value={uni}>{uni}</option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium mb-2">İxtisas Seçimi*</FormLabel>
                <FormControl>
                  <select {...field} className="border rounded p-3 w-full">
                    <option value="">Seçin</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField control={form.control} name="motivation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium mb-2">Motivasiya Məktubu*</FormLabel>
                <FormControl>
                  <textarea {...field} placeholder="Motivasiya Məktubu" className="border rounded p-3 w-full" rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField control={form.control} name="programmingKnowledge"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium mb-2">Proqramlaşdırma Bilgisi*</FormLabel>
                <FormControl>
                  <Input className="border rounded p-3 w-full" placeholder="Programlaşdırma Bilgisi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField control={form.control} name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium mb-2">GitHub / Portföy Linki</FormLabel>
                <FormControl>
                  <Input className="border rounded p-3 w-full" placeholder="GitHub və ya Portföy URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
<FormField control={form.control} name="github"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-sm font-medium mb-2">GitHub / Portföy Linki</FormLabel>
      <FormControl>
        <Input
          className="border rounded p-3 w-full"
          placeholder="GitHub və ya Portföy URL"
          value={field.value ?? ""} // null 
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


          {/* <button type="submit" className="bg-blue-500 text-white p-3 rounded mt-4 w-full">Göndər</button> */}
       <div className="flex justify-center items-center">
        {
          isLoading ? <Spin size="large"/> :  <AiButton/>
        }
      
       </div>
        </form>
      </Form>
    </div>

</>
  )
}

export default TechNextForm

